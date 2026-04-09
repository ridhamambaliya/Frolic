import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import {
  createInstituteController,
  deleteInstituteController,
  getAllInstitutesController,
  getInstituteByIdController,
  getMyInstituteController,
  updateInstituteController,
} from "./institute.controller.js";

const instituteRoutes = express.Router();

instituteRoutes.use(authMiddleware);

instituteRoutes.get("/my", roleMiddleware("institute_coordinator"), getMyInstituteController);
instituteRoutes.get("/", roleMiddleware("admin"), getAllInstitutesController);
instituteRoutes.get("/:id", roleMiddleware("admin"), getInstituteByIdController);
instituteRoutes.post("/", roleMiddleware("admin"), createInstituteController);
instituteRoutes.put("/:id", roleMiddleware("admin"), updateInstituteController);
instituteRoutes.delete("/:id", roleMiddleware("admin"), deleteInstituteController);

export default instituteRoutes;