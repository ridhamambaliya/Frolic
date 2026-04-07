import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import { createInstituteController } from "./institute.controller.js";
import { getAllInstitutesController } from "./institute.controller.js";
import { getInstituteByIdController } from "./institute.controller.js";
import { updateInstituteController } from "./institute.controller.js";
import { deleteInstituteController } from "./institute.controller.js";

const instituteRoutes = express.Router();

instituteRoutes.use(authMiddleware);
instituteRoutes.use(roleMiddleware("admin"));

instituteRoutes.post("/", createInstituteController);
instituteRoutes.get("/", getAllInstitutesController);
instituteRoutes.get("/:id", getInstituteByIdController);
instituteRoutes.put("/:id", updateInstituteController);
instituteRoutes.delete("/:id", deleteInstituteController);

export default instituteRoutes;