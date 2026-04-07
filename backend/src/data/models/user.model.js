import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type: String,
        required: true,
        minlength: 6,
        Select: false
    },
    role : {
        type: String,
        required: true,
        default: "student",
        enum: [
            "institute_coordinator",
            "department_coordinator",
            "event_coordinator",
            "student",
            "admin"
        ]
    }
}, {timestamps: true});
const User = mongoose.model("User",userSchema);
export default User