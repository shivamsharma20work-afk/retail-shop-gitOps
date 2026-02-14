const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock Database (Memory mein rahega) ---
const USERS = []; 

// --- 1. Login/Register API ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for:", email);

  // Simple logic: Agar naya hai toh register, purana hai toh match
  let user = USERS.find(u => u.email === email);

  if (!user) {
    // Pehli baar aaya hai toh save kar lo
    user = { email, password };
    USERS.push(user);
    return res.status(200).json({ 
      success: true, 
      message: "Welcome! Aap register ho gaye bina DB ke." 
    });
  }

  if (user.password === password) {
    res.status(200).json({ success: true, message: "Login Successful!" });
  } else {
    res.status(401).json({ success: false, message: "Password galat hai bhai!" });
  }
});

// --- 2. Products API ---
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: "Kubernetes Hoodie", price: 1200 },
    { id: 2, name: "Docker Mug", price: 450 },
    { id: 3, name: "ArgoCD Sticker Pack", price: 150 },
    { id: 4, name: "Helm Helmets", price: 2500 },
    { id: 5, name: "Terraform Cap", price: 600 },
    { id: 6, name: "Jenkins Plushie", price: 800 }
  ]);
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend bina MongoDB ke mast chal raha hai on port ${PORT}`);
});