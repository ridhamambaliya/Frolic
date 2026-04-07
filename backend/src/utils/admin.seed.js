import User from "../modules/auth/auth.model.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = await User.create({
      name: process.env.ADMIN_NAME || "Super Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Default admin created:", admin.email);
  } catch (error) {
    console.log("Admin creation error:", error.message);
  }
};

export default createAdmin;