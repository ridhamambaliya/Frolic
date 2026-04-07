import { Schema } from "mongoose";

const departmentSchema = new Schema ({
    branchName : {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    }
})