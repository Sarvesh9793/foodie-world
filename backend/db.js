

const mongoose = require('mongoose');
require('dotenv').config();

const fetchFoodData = async () => {
    try {
        const foodItems = await mongoose.connection.db.collection("foot_item").find({}).toArray();
        const foodCategories = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foot_item = foodItems;
        global.foodCategory = foodCategories;
        console.log("Food data fetched successfully");
    } catch (error) {
        console.error("Error fetching food data:", error);
    }
};

const dbConnect = async () => {
    const dbUri = process.env.MONGODB_URI;

    console.log('MONGODB_URI:', dbUri);

    if (!dbUri) {
        console.error('MONGODB_URI is not defined in environment variables');
        process.exit(1); 
    }

    try {
        // await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoose.connect(dbUri);
        console.log("MongoDB connected successfully");

        await fetchFoodData();
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); 
    }
};

module.exports = dbConnect;

