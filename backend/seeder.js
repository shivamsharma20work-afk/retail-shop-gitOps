
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

// Config load karo
dotenv.config();

// DB se connect karo
connectDB();

const products = [
    { 
        name: "Kubernetes Hoodie", 
        price: 1200, 
        description: "Premium cotton hoodie for K8s lovers",
        category: "Apparel",
        image: "🧥"
    },
    { 
        name: "Docker Mug", 
        price: 450, 
        description: "Containerize your coffee",
        category: "Accessories",
        image: "☕"
    },
    { 
        name: "ArgoCD Sticker Pack", 
        price: 150, 
        description: "Sync your laptop with these stickers",
        category: "Stationery",
        image: "🏷️"
    },
    { 
        name: "Helm Helmets", 
        price: 2500, 
        description: "Chart your safety with style",
        category: "Safety",
        image: "🪖"
    }
];

const importData = async () => {
    try {
        // Purana data delete karo taaki duplicates na ho
        await Product.deleteMany();

        // Naya data insert karo
        await Product.insertMany(products);

        console.log('✅ Data Imported Successfully, Bhai!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('🗑️ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Command line arguments check karo
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}