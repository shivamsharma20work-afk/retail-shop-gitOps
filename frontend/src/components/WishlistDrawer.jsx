import React from 'react';

const WishlistDrawer = ({ wishlist, setIsWishlistOpen, addToCart, toggleWishlist }) => {
  return (
    <div className="cart-modal" style={{ borderLeft: '5px solid #ff4d4d' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0 }}>Your Wishlist ❤️</h3>
        <button 
          onClick={() => setIsWishlistOpen(false)} 
          style={{ border: 'none', background: 'none', fontSize: '28px', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      
      <hr style={{ border: '0.5px solid #eee' }} />

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '18px', color: '#555' }}>Wishlist khali hai bhai! 🤍</p>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            style={{ background: '#007185', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {wishlist.map((item) => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '15px 0', 
              borderBottom: '1px solid #eee' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>📦</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#B12704', fontWeight: 'bold' }}>₹{item.price}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    addToCart(item);
                    // Wishlist se item move karne ke baad chaho toh hata sakte ho
                  }} 
                  title="Add to Cart"
                  style={{ background: '#ffd814', border: '1px solid #fcd200', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  🛒
                </button>
                <button 
                  onClick={() => toggleWishlist(item)} 
                  title="Remove"
                  style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={() => setIsWishlistOpen(false)}
        style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#f3f3f3', border: '1px solid #adb1b8', borderRadius: '4px', cursor: 'pointer' }}
      >
        Close Wishlist
      </button>
    </div>
  );
};

export default WishlistDrawer;