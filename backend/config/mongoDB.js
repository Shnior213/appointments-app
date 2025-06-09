const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.BASE_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
    }
};

module.exports = connect;

