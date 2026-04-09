import User from "./auth.model.js";
import Institute from "../institutes/institute.model.js";
import Department from "../department/department.model.js";
import {
  getUsersService,
  loginService,
  registerService,
  updateUserRoleService,
  updateProfileService,
  updatePasswordService,
} from "./auth.service.js";

export const registerController = async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    const statusCode =
      error.message === "Your account has been banned. Please contact admin."
        ? 403
        : 401;

    res.status(statusCode).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const meController = async (req, res) => {
  let institute = null;
  let department = null;

  if (req.user.role === "institute_coordinator") {
    institute = await Institute.findOne({ coordinator: req.user._id }).select(
      "name code city status description departments coordinator"
    );
  }

  if (req.user.role === "department_coordinator") {
    department = await Department.findOne({ coordinator: req.user._id })
      .populate("institute", "name code city")
      .select("name status description institute coordinator");
  }

  res.status(200).json({
    success: true,
    data: {
      user: req.user,
      institute,
      department,
    },
  });
};

export const getUsersController = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const users = await getUsersService(search);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};

export const toggleBanController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "Admin cannot be banned" });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBanned ? "User banned" : "User unbanned",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update user",
    });
  }
};

export const updateUserRoleController = async (req, res) => {
  try {
    const user = await updateUserRoleService(req.params.id, req.body.role);

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update role",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const user = await updateProfileService(req.user._id, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const result = await updatePasswordService(req.user._id, req.body);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update password",
    });
  }
};