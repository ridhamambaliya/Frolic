import Institute from "./institute.model.js";
import User from "../auth/auth.model.js";
import Department from "../department/department.model.js";
import Event from "../event/event.model.js";

export const createInstituteService = async (payload) => {
  const existingInstitute = await Institute.findOne({
    $or: [{ name: payload.name }, { code: payload.code.toUpperCase() }],
  });

  if (existingInstitute) {
    throw new Error("Institute already exists with same name or code");
  }

  const coordinator = await User.findById(payload.coordinator);
  if (!coordinator) {
    throw new Error("Coordinator not found");
  }

  const coordinatorAlreadyAssigned = await Institute.findOne({
    coordinator: payload.coordinator,
  });

  if (coordinatorAlreadyAssigned) {
    throw new Error("This coordinator is already assigned to another institute");
  }

  const institute = await Institute.create({
    ...payload,
    code: payload.code.toUpperCase(),
  });

  if (coordinator.role !== "institute_coordinator") {
    coordinator.role = "institute_coordinator";
    await coordinator.save();
  }

  return institute;
};

export const getAllInstitutesService = async (search = "") => {
  const query = search
    ? {
        name: { $regex: search, $options: "i" },
      }
    : {};

  return await Institute.find(query)
    .populate("coordinator", "name email role")
    .sort({ createdAt: -1 });
};

export const getInstituteByIdService = async (id) => {
  const institute = await Institute.findById(id).populate("coordinator", "name email role");

  if (!institute) {
    throw new Error("Institute not found");
  }

  return institute;
};

export const getMyInstituteService = async (userId) => {
  const institute = await Institute.findOne({ coordinator: userId }).populate(
    "coordinator",
    "name email role"
  );

  if (!institute) {
    throw new Error("Institute not found for this coordinator");
  }

  return institute;
};

export const updateInstituteService = async (id, payload) => {
  if (payload.code) {
    payload.code = payload.code.toUpperCase();
  }

  const existingInstitute = await Institute.findById(id);
  if (!existingInstitute) {
    throw new Error("Institute not found");
  }

  if (payload.coordinator) {
    const newCoordinator = await User.findById(payload.coordinator);
    if (!newCoordinator) {
      throw new Error("Coordinator not found");
    }

    const coordinatorAlreadyAssigned = await Institute.findOne({
      coordinator: payload.coordinator,
      _id: { $ne: id },
    });

    if (coordinatorAlreadyAssigned) {
      throw new Error("This coordinator is already assigned to another institute");
    }

    const oldCoordinatorId = existingInstitute.coordinator?.toString();
    const newCoordinatorId = payload.coordinator.toString();

    if (oldCoordinatorId !== newCoordinatorId) {
      const oldCoordinator = await User.findById(oldCoordinatorId);

      if (oldCoordinator && oldCoordinator.role === "institute_coordinator") {
        oldCoordinator.role = "student";
        await oldCoordinator.save();
      }

      if (newCoordinator.role !== "institute_coordinator") {
        newCoordinator.role = "institute_coordinator";
        await newCoordinator.save();
      }
    }
  }

  const institute = await Institute.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("coordinator", "name email role");

  return institute;
};

export const deleteInstituteService = async (id) => {
  const institute = await Institute.findById(id);

  if (!institute) {
    throw new Error("Institute not found");
  }

  const coordinatorId = institute.coordinator;

  const departments = await Department.find({ institute: id });
  for (const dept of departments) {
    if (dept.coordinator) {
      await User.findByIdAndUpdate(dept.coordinator, { role: "student" });
    }
  }

  const events = await Event.find({ institute: id });
  for (const event of events) {
    if (event.coordinator) {
      await User.findByIdAndUpdate(event.coordinator, { role: "student" });
    }
  }

  await Event.deleteMany({ institute: id });
  await Department.deleteMany({ institute: id });

  if (coordinatorId) {
    await User.findByIdAndUpdate(coordinatorId, { role: "student" });
  }

  await Institute.findByIdAndDelete(id);

  return institute;
};