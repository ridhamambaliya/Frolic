import User from "./auth.model.js";
import { getUsersService, loginService, registerService, updateUserRoleService } from "./auth.service.js";

export const registerController = async (req, res) => {
  try {
    const data = await registerService(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const data = await loginService(req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};

export const meController = async (req, res) => {
  res.status(200).json({
    user: req.user,
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

    user.isBanned = !user.isBanned;
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBanned ? "User banned" : "User unbanned",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
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
      message: error.message || "Failed to update role",
    });
  }
};