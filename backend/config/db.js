const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MONGO_URI hum .env file se lenge (Best Practice)
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bhaizon');
        
        console.log(`--------------------------------------`);
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
        console.log(`--------------------------------------`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Failure par app band kar do
    }
};

module.exports = connectDB;