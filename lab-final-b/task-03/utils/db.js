const mongoose = require("mongoose");

let connection = null;

const connectToMongoDb = async () => {
    try {
        if (!connection) {
            connection = await mongoose.connect(process.env.MONGODB_URI);
            console.log("MongoDB connected successfully");
        }
        return connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

module.exports = { connectToMongoDb };
