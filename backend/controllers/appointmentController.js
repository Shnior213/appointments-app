const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {
    try {
        const { title, date, time, description } = req.body;
        const userId = req.user.id;

        const appointment = new Appointment({
            user: userId,
            title,
            date,
            time,
            description,
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Failed to create appointment", error: error.message });
    }
};


const getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointments = await Appointment.find({ user: userId });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Failed to get appointments", error: error.message });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, description } = req.body;
        const userId = req.user.id;

        const appointment = await Appointment.findOne({ _id: id, user: userId });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.date = date || appointment.date;
        appointment.description = description || appointment.description;

        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Failed to update appointment", error: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const appointment = await Appointment.findOneAndDelete({ _id: id, user: userId });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete appointment", error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment,
};
