import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import generateToken from "../../utils/genrateToken.js";

export const registerService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return {
    token,
    role: user.role,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBanned: user.isBanned,
    },
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.isBanned) {
    throw new Error("Your account has been banned. Please contact admin.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    token,
    role: user.role,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBanned: user.isBanned,
    },
  };
};

export const updateUserRoleService = async (id, role) => {
  const allowedRoles = ["student", "institute_coordinator", "department_coordinator"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role selected");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    {  returnDocument: "after", runValidators: true }
  ).select("name email role isBanned createdAt");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUsersService = async (search = "") => {
  const query = {
    role: { $ne: "admin" },
  };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query)
    .select("name email role isBanned createdAt")
    .sort({ createdAt: -1 });

  return users;
};