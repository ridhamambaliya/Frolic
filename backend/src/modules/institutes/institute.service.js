import Institute from "./institute.model.js";
import User from "../auth/auth.model.js";
import Department from "../department/department.model.js";

export const createInstituteService = async (payload) => {
  const existingInstitute = await Institute.findOne({
    $or: [
      { name: payload.name },
      { code: payload.code.toUpperCase() },
    ],
  });

  if (existingInstitute) {
    throw new Error("Institute already exists with same name or code");
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

  return institute;
};

export const getAllInstitutesService = async (search = "") => {
  const query = search
    ? {
      name: { $regex: search, $options: "i" },
    }
    : {};

  const institutes = await Institute.find(query).populate("coordinator", "name email").sort({ createdAt: -1 });

  return institutes;
};

export const getInstituteByIdService = async (id) => {
  const institute = await Institute.findById(id).populate("coordinator", "name email");

  if (!institute) {
    throw new Error("Institute not found");
  }

  return institute;
};

export const updateInstituteService = async (id, payload) => {
  if (payload.code) {
    payload.code = payload.code.toUpperCase();
  }

  if (payload.coordinator) {
    const coordinatorAlreadyAssigned = await Institute.findOne({
      coordinator: payload.coordinator,
      _id: { $ne: id },
    });
    if (coordinatorAlreadyAssigned) {
      throw new Error("This coordinator is already assigned to another institute");
    }
  }
  const institute = await Institute.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!institute) {
    throw new Error("Institute not found");
  }

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
      await User.findByIdAndUpdate(dept.coordinator, {
        role: "student",
      });
    }
  }
  await Department.deleteMany({ institute: id });

  // await Event.deleteMany({ institute: id });

  if (coordinatorId) {
    await User.findByIdAndUpdate(coordinatorId, {
      role: "student",
    });
  }

  await Institute.findByIdAndDelete(id);

  return institute;
};