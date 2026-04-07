import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        institute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institute",  
            required: true,
        },
        coordinator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Active","Pending","Inactive"],
            default: "Pending",
        },
        description: {
            type: String,
            trim: true,
            default: "",

        },
    },
    {timestamps: true}
);
const Department = mongoose.model("Department", departmentSchema);

export default Department;

