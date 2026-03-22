import React, { useState } from 'react';

const LoginModal = ({ setIsLoggedIn, setShowLogin, setShowDiscount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting login...");
    
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsLoggedIn(true);
        setShowLogin(false);
        setShowDiscount(true); 
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Backend se locha ho gaya bhai! Check kar server.js chal raha hai?");
    }
  };

  return (
    <div style={{
      position: 'fixed', // Screen ke upar fix karne ke liye
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999, // Sabse upar dikhane ke liye
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        maxWidth: '400px', 
        width: '90%', 
        padding: '30px', 
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        position: 'relative'
      }}>
        <button 
          onClick={() => setShowLogin(false)} 
          style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}
        >×</button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>Sign In</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cloud@example.com" 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••" 
              required 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} 
            />
          </div>

          <button type="submit" className="add-btn" style={{ 
            padding: '14px', marginTop: '10px', fontSize: '16px', fontWeight: 'bold' 
          }}>
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;