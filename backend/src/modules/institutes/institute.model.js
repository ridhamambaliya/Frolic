import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Inactive"],
      default: "Pending",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    departments: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Institute = mongoose.model("Institute", instituteSchema);

export default Institute;