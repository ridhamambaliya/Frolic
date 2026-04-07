import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";
import { createDepartmentController, deleteDepartmentController, getAllDepartmentsController, getDepartmentByIdController, updateDepartmentController } from "./department.controller.js";




const departmentRoutes = express.Router();

departmentRoutes.use(authMiddleware);
departmentRoutes.use(roleMiddleware("admin"));

departmentRoutes.post("/",createDepartmentController);
departmentRoutes.get("/",getAllDepartmentsController);
departmentRoutes.get("/:id",getDepartmentByIdController);
departmentRoutes.put("/:id",updateDepartmentController);
departmentRoutes.delete("/:id",deleteDepartmentController);



export default departmentRoutes;