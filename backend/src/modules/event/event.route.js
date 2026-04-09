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

// protected for admin only for now
eventRoutes.use(authMiddleware);
eventRoutes.use(roleMiddleware("admin"));

eventRoutes.post("/", createEventController);
eventRoutes.get("/", getAllEventsController);
eventRoutes.get("/:id", getEventByIdController);
eventRoutes.put("/:id", updateEventController);
eventRoutes.delete("/:id", deleteEventController);

export default eventRoutes;