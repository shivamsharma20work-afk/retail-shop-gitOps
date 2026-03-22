import React from 'react';

const CartDrawer = ({ cart, setIsCartOpen, removeFromCart }) => {
  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div style={{
      position: 'fixed', // Screen par fix rahega
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#f8fafc', // Clean light background
      zIndex: 5000, // Sabse upar
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      {/* Header Area */}
      <div style={{ 
        padding: '15px 40px', 
        background: '#0f172a', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'sticky',
        top: 0
      }}>
        <h2 style={{ margin: 0, fontSize: '22px' }}>Shopping Cart ({cart.length})</h2>
        <button 
          onClick={() => setIsCartOpen(false)}
          style={{ 
            background: '#6366f1', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Back to Shop
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <span style={{ fontSize: '80px' }}>🛒</span>
            <h2 style={{ color: '#64748b' }}>Bhai, cart khali hai!</h2>
            <button onClick={() => setIsCartOpen(false)} className="add-btn" style={{ padding: '12px 30px', marginTop: '20px' }}>
              Shopping Shuru Karo
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
            
            {/* List of Items */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              {cart.map((item) => (
                <div key={item.cartId} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '20px 0', 
                  borderBottom: '1px solid #f1f5f9' 
                }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ fontSize: '30px', background: '#f1f5f9', padding: '15px', borderRadius: '12px' }}>📦</div>
                    <div>
                      <h4 style={{ margin: 0, color: '#1e293b' }}>{item.name}</h4>
                      <p style={{ margin: '5px 0 0 0', color: '#6366f1', fontWeight: 'bold' }}>₹{item.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Remove 🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '20px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
              height: 'fit-content',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ margin: '0 0 20px 0' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>₹{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                <span style={{ color: '#64748b' }}>Shipping</span>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>FREE</span>
              </div>
              <hr style={{ border: '0.5px solid #f1f5f9' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', fontSize: '22px', fontWeight: '800' }}>
                <span>Total</span>
                <span style={{ color: '#0f172a' }}>₹{total}</span>
              </div>
              <button style={{ 
                width: '100%', 
                padding: '16px', 
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)', 
                color: 'white',
                border: 'none', 
                borderRadius: '12px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
              }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;