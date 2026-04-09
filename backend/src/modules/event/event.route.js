import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
} from "./event.controller.js";

const eventRoutes = express.Router();

eventRoutes.use(authMiddleware);

eventRoutes.get("/", getAllEventsController);
eventRoutes.get("/:id", getEventByIdController);
eventRoutes.post("/", roleMiddleware("admin", "institute_coordinator"), createEventController);
eventRoutes.put("/:id", roleMiddleware("admin", "institute_coordinator"), updateEventController);
eventRoutes.delete("/:id", roleMiddleware("admin", "institute_coordinator"), deleteEventController);

export default eventRoutes;