import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
} from "./event.service.js";

export const createEventController = async (req, res, next) => {
  try {
    const result = await createEventService(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEventsController = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const result = await getAllEventsService(search);

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventByIdController = async (req, res, next) => {
  try {
    const result = await getEventByIdService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (req, res, next) => {
  try {
    const result = await updateEventService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEventController = async (req, res, next) => {
  try {
    const result = await deleteEventService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};