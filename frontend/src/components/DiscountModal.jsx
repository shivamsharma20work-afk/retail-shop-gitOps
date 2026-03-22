import React, { useState } from 'react';

const DiscountModal = ({ setShowDiscount }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = "BHAI200";

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    // 2 second baad "Copied!" hata denge
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000,
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ 
        backgroundColor: 'white',
        maxWidth: '450px', 
        width: '90%', 
        padding: '40px', 
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.5)',
        textAlign: 'center',
        position: 'relative',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>🎊</div>
        
        <h2 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 10px 0', fontWeight: '800' }}>
          CloudCart Special Offer!
        </h2>
        
        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.5' }}>
          Logged in Successfully, Welcome <br />
          <span style={{ color: '#6366f1', fontWeight: 'bold', fontSize: '20px' }}>₹200 Instant Discount</span>
          <br />On Your First Order!
        </p>

        {/* Promo Code Box with Copy Feature */}
        <div style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
          color: 'white', 
          padding: '20px', 
          fontSize: '26px', 
          fontWeight: '900', 
          borderRadius: '16px',
          margin: '25px 0',
          letterSpacing: '3px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          position: 'relative'
        }}>
          <span>{promoCode}</span>
          <span 
            onClick={handleCopy}
            title="Copy Code"
            style={{ 
              cursor: 'pointer', 
              fontSize: '22px', 
              background: 'rgba(255,255,255,0.2)', 
              padding: '5px 10px', 
              borderRadius: '8px',
              transition: '0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.4)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            {copied ? '✅' : '📋'}
          </span>

          {copied && (
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              fontSize: '12px',
              background: '#22c55e',
              padding: '2px 10px',
              borderRadius: '4px',
              fontWeight: 'normal'
            }}>
              Copied to clipboard!
            </div>
          )}
        </div>

        <button 
          onClick={() => setShowDiscount(false)} 
          className="add-btn" 
          style={{ 
            width: '100%', 
            padding: '16px', 
            fontSize: '18px', 
            borderRadius: '14px',
            cursor: 'pointer'
          }}
        >
          EXPLORE ⟶
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DiscountModal;