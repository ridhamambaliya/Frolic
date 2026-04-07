import { Router } from "express";
import { addEvent, getAllEvent } from "../controller/event.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";

const eventRouter = Router();

// Create Event (Only authenticated users)
eventRouter.post("/addevent", protect, authorizeRoles("admin","event_coordinator"), addEvent);
eventRouter.get("/allevent", getAllEvent);

export default eventRouter;
