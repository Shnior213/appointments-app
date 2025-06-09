const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["scheduled", "completed", "canceled"],
            default: "scheduled",
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Appointment", appointmentSchema);
