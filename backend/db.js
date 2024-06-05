const mongoose = require('mongoose');

const dbConnect = async () => {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
        console.error('MONGODB_URI is not defined in environment variables');
        process.exit(1); // Exit the application with an error code
    }

    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit the application with an error code
    }
};

module.exports = dbConnect;
