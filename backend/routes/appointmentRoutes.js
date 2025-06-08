const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");

router.post("/", authMiddleware, createAppointment);
router.get("/", authMiddleware, getAppointments);
router.put("/:id", authMiddleware, updateAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router;
