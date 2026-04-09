import express from "express";
import {
  getUsersController,
  loginController,
  meController,
  registerController,
  toggleBanController,
  updateUserRoleController,
  updateProfileController,
  updatePasswordController,
} from "./auth.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", authMiddleware, meController);
authRoutes.get("/users", authMiddleware, roleMiddleware("admin"), getUsersController);
authRoutes.patch("/users/:id/toggle-ban", authMiddleware, roleMiddleware("admin"), toggleBanController);
authRoutes.patch("/users/:id/role", authMiddleware, roleMiddleware("admin"), updateUserRoleController);
authRoutes.patch("/update-profile", authMiddleware, updateProfileController);
authRoutes.patch("/update-password", authMiddleware, updatePasswordController);

export default authRoutes;