const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- 1. MongoDB Connection Setup ---
// Agar local MongoDB hai toh 127.0.0.1 use karna best hai
const MONGO_URI = process.env.MONGO_URL || "mongodb://mongo:27017/bhaizon"; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connect Ho Gaya Bhai! 🚀'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
    console.log('Bhai, check kar MongoDB Compass ya service chalu hai?');
  });

// --- 2. User Schema & Model ---
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// --- 3. APIs ---

// Login + Auto-Register Logic
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received for:", email);

  try {
    // Check if database is connected first
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: "Database connection fail hai!" });
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      // Agar user nahi mila, toh naya bana do (Baar baar galat pass wala jhanjhat khatam)
      console.log("Naya user hai, register kar raha hoon...");
      user = new User({ email, password });
      await user.save();
      return res.status(200).json({ 
        success: true, 
        message: "Welcome naye bhai! Aap register ho gaye." 
      });
    }

    // Agar user mil gaya, toh password match karo
    if (user.password === password) {
      res.status(200).json({ success: true, message: "Login Successful!" });
    } else {
      res.status(401).json({ success: false, message: "Email ya Password galat hai bhai!" });
    }
  } catch (error) {
    console.error("Server Logic Error:", error);
    res.status(500).json({ success: false, message: "Backend mein internal locha hai!" });
  }
});

// Products API
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: "Kubernetes Hoodie", price: 1200 },
    { id: 2, name: "Docker Mug", price: 450 },
    { id: 3, name: "ArgoCD Sticker Pack", price: 150 },
    { id: 4, name: "Helm Helmets", price: 2500 }
  ]);
});

// --- 4. Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT} 🔥`);
});