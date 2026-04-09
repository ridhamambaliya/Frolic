import User from "../auth/auth.model.js";
import Institute from "../institutes/institute.model.js";
import Department from "./department.model.js";

export const createDepartmentService = async (payload, currentUser = null) => {
  const existingDepartment = await Department.findOne({
    name: payload.name,
    institute: payload.institute,
  });

  if (existingDepartment) {
    throw new Error("Department already exists in this institute");
  }

  const institute = await Institute.findById(payload.institute);
  if (!institute) {
    throw new Error("Institute not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    institute.coordinator.toString() !== currentUser._id.toString()
  ) {
    throw new Error("You can only create departments in your own institute");
  }

  const coordinator = await User.findById(payload.coordinator);
  if (!coordinator) {
    throw new Error("Coordinator not found");
  }

  const coordinatorAlreadyAssigned = await Department.findOne({
    coordinator: payload.coordinator,
  });

  if (coordinatorAlreadyAssigned) {
    throw new Error("This coordinator is already assigned to another department");
  }

  const department = await Department.create(payload);

  if (coordinator.role !== "department_coordinator") {
    coordinator.role = "department_coordinator";
    await coordinator.save();
  }

  await Institute.findByIdAndUpdate(payload.institute, { $inc: { departments: 1 } });

  return department;
};

export const getAllDepartmentsService = async (search = "", currentUser = null) => {
  const query = search
    ? {
        name: { $regex: search, $options: "i" },
      }
    : {};

  if (currentUser?.role === "institute_coordinator") {
    const institute = await Institute.findOne({ coordinator: currentUser._id });
    if (!institute) {
      return [];
    }
    query.institute = institute._id;
  }

  return await Department.find(query)
    .populate("institute", "name code city")
    .populate("coordinator", "name email role")
    .sort({ createdAt: -1 });
};

export const getDepartmentByIdService = async (id, currentUser = null) => {
  const department = await Department.findById(id)
    .populate("institute", "name code city coordinator")
    .populate("coordinator", "name email role");

  if (!department) {
    throw new Error("Department not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    department.institute?.coordinator?.toString() !== currentUser._id.toString()
  ) {
    throw new Error("Access denied");
  }

  return department;
};

export const updateDepartmentService = async (id, payload, currentUser = null) => {
  const existingDepartment = await Department.findById(id).populate("institute");
  if (!existingDepartment) {
    throw new Error("Department not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    existingDepartment.institute?.coordinator?.toString() !== currentUser._id.toString()
  ) {
    throw new Error("You can only update departments in your own institute");
  }

  if (payload.institute) {
    const institute = await Institute.findById(payload.institute);
    if (!institute) {
      throw new Error("Institute not found");
    }
  }

  if (payload.coordinator) {
    const newCoordinator = await User.findById(payload.coordinator);
    if (!newCoordinator) {
      throw new Error("Coordinator not found");
    }

    const coordinatorAlreadyAssigned = await Department.findOne({
      coordinator: payload.coordinator,
      _id: { $ne: id },
    });

    if (coordinatorAlreadyAssigned) {
      throw new Error("This coordinator is already assigned to another department");
    }

    const oldCoordinatorId = existingDepartment.coordinator?.toString();
    const newCoordinatorId = payload.coordinator.toString();

    if (oldCoordinatorId !== newCoordinatorId) {
      const oldCoordinator = await User.findById(oldCoordinatorId);

      if (oldCoordinator && oldCoordinator.role === "department_coordinator") {
        oldCoordinator.role = "student";
        await oldCoordinator.save();
      }

      if (newCoordinator.role !== "department_coordinator") {
        newCoordinator.role = "department_coordinator";
        await newCoordinator.save();
      }
    }
  }

  return await Department.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("institute", "name code city")
    .populate("coordinator", "name email role");
};

export const deleteDepartmentService = async (id, currentUser = null) => {
  const department = await Department.findById(id).populate("institute");

  if (!department) {
    throw new Error("Department not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    department.institute?.coordinator?.toString() !== currentUser._id.toString()
  ) {
    throw new Error("You can only delete departments in your own institute");
  }

  const coordinatorId = department.coordinator;
  await department.deleteOne();

  if (coordinatorId) {
    const coordinator = await User.findById(coordinatorId);
    if (coordinator && coordinator.role === "department_coordinator") {
      coordinator.role = "student";
      await coordinator.save();
    }
  }

  await Institute.findByIdAndUpdate(department.institute._id, {
    $inc: { departments: -1 },
  });

  return department;
};