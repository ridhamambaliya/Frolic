import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        tagline: {
            type: String,
            trim: true,
            default: "",
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        image: {
            type: String,
            trim: true,
            default: "",
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            trim: true,
            required: true,
        },
        category: {
            type: String,
            trim: true,
            default: "",
        },
        fees: {
            type: Number,
            default: 0,
            min: 0,
        },
        prizes: {
            type: String,
            trim: true,
            default: "",
        },
        participationType: {
            type: String,
            enum: ["solo", "team"],
            default: "solo",
        },
        groupMinParticipants: {
            type: Number,
            default: 1,
            min: 1,
        },
        groupMaxParticipants: {
            type: Number,
            default: 1,
            min: 1,
        },
        maxGroupsAllowed: {
            type: Number,
            default: 1,
            min: 1,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
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
        studentCoordinatorName: {
            type: String,
            trim: true,
            default: "",
        },
        studentCoordinatorEmail: {
            type: String,
            trim: true,
            default: "",
        },
        studentCoordinatorPhone: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["Active", "Pending", "Inactive"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;