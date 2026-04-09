import Event from "./event.model.js";
import Department from "../department/department.model.js";
import Institute from "../institutes/institute.model.js";
import User from "../auth/auth.model.js";

export const createEventService = async (payload, currentUser = null) => {
  const existingEvent = await Event.findOne({
    name: payload.name,
    department: payload.department,
    date: payload.date,
  });

  if (existingEvent) {
    throw new Error("Event already exists for this department on this date");
  }

  const department = await Department.findById(payload.department).populate("institute");
  if (!department) {
    throw new Error("Department not found");
  }

  const institute = await Institute.findById(payload.institute);
  if (!institute) {
    throw new Error("Institute not found");
  }

  if (department.institute._id.toString() !== payload.institute.toString()) {
    throw new Error("Department does not belong to the selected institute");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    institute.coordinator.toString() !== currentUser._id.toString()
  ) {
    throw new Error("You can only create events in your own institute");
  }

  const coordinator = await User.findById(payload.coordinator);
  if (!coordinator) {
    throw new Error("Coordinator not found");
  }

  if (payload.participationType === "solo") {
    payload.groupMinParticipants = 1;
    payload.groupMaxParticipants = 1;
  }

  if (payload.groupMinParticipants > payload.groupMaxParticipants) {
    throw new Error("Minimum participants cannot be greater than maximum participants");
  }

  if (payload.maxGroupsAllowed < 1) {
    throw new Error("Max groups allowed must be at least 1");
  }

  const event = await Event.create(payload);

  if (coordinator.role !== "event_coordinator") {
    coordinator.role = "event_coordinator";
    await coordinator.save();
  }

  return event;
};

export const getAllEventsService = async (search = "", currentUser = null) => {
  const query = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  if (currentUser?.role === "institute_coordinator") {
    const institute = await Institute.findOne({ coordinator: currentUser._id });
    if (!institute) {
      return [];
    }
    query.institute = institute._id;
  }

  return await Event.find(query)
    .populate("department", "name status")
    .populate("institute", "name code city")
    .populate("coordinator", "name email role")
    .sort({ createdAt: -1 });
};

export const getEventByIdService = async (id, currentUser = null) => {
  const event = await Event.findById(id)
    .populate("department", "name status")
    .populate("institute", "name code city coordinator")
    .populate("coordinator", "name email role");

  if (!event) {
    throw new Error("Event not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    event.institute?.coordinator?.toString() !== currentUser._id.toString()
  ) {
    throw new Error("Access denied");
  }

  return event;
};

export const updateEventService = async (id, payload, currentUser = null) => {
  const existingEvent = await Event.findById(id).populate("institute");
  if (!existingEvent) {
    throw new Error("Event not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    existingEvent.institute?.coordinator?.toString() !== currentUser._id.toString()
  ) {
    throw new Error("You can only update events in your own institute");
  }

  const departmentId = payload.department || existingEvent.department;
  const instituteId = payload.institute || existingEvent.institute;

  const department = await Department.findById(departmentId).populate("institute");
  if (!department) {
    throw new Error("Department not found");
  }

  const institute = await Institute.findById(instituteId);
  if (!institute) {
    throw new Error("Institute not found");
  }

  if (department.institute._id.toString() !== instituteId.toString()) {
    throw new Error("Department does not belong to the selected institute");
  }

  if (payload.coordinator) {
    const newCoordinator = await User.findById(payload.coordinator);
    if (!newCoordinator) {
      throw new Error("Coordinator not found");
    }

    const oldCoordinatorId = existingEvent.coordinator?.toString();
    const newCoordinatorId = payload.coordinator.toString();

    if (oldCoordinatorId !== newCoordinatorId) {
      const oldCoordinator = await User.findById(oldCoordinatorId);

      if (oldCoordinator && oldCoordinator.role === "event_coordinator") {
        oldCoordinator.role = "student";
        await oldCoordinator.save();
      }

      if (newCoordinator.role !== "event_coordinator") {
        newCoordinator.role = "event_coordinator";
        await newCoordinator.save();
      }
    }
  }

  const minParticipants =
    payload.participationType === "solo"
      ? 1
      : payload.groupMinParticipants ?? existingEvent.groupMinParticipants;

  const maxParticipants =
    payload.participationType === "solo"
      ? 1
      : payload.groupMaxParticipants ?? existingEvent.groupMaxParticipants;

  const maxGroupsAllowed =
    payload.maxGroupsAllowed ?? existingEvent.maxGroupsAllowed;

  if (minParticipants > maxParticipants) {
    throw new Error("Minimum participants cannot be greater than maximum participants");
  }

  if (maxGroupsAllowed < 1) {
    throw new Error("Max groups allowed must be at least 1");
  }

  if (payload.participationType === "solo") {
    payload.groupMinParticipants = 1;
    payload.groupMaxParticipants = 1;
  }

  return await Event.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("department", "name status")
    .populate("institute", "name code city")
    .populate("coordinator", "name email role");
};

export const deleteEventService = async (id, currentUser = null) => {
  const event = await Event.findById(id).populate("institute");

  if (!event) {
    throw new Error("Event not found");
  }

  if (
    currentUser &&
    currentUser.role === "institute_coordinator" &&
    event.institute?.coordinator?.toString() !== currentUser._id.toString()
  ) {
    throw new Error("You can only delete events in your own institute");
  }

  const coordinatorId = event.coordinator;
  await event.deleteOne();

  if (coordinatorId) {
    const coordinator = await User.findById(coordinatorId);
    if (coordinator && coordinator.role === "event_coordinator") {
      coordinator.role = "student";
      await coordinator.save();
    }
  }

  return event;
};