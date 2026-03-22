import React from 'react';

const Navbar = ({ searchTerm, setSearchTerm, cartCount, setIsCartOpen, setIsWishlistOpen, isLoggedIn, setShowLogin }) => {
  return (
    <nav style={{ padding: '15px 30px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Logo */}
        <h2 style={{ color: 'white', margin: 0, fontSize: '26px', letterSpacing: '-1px', flexShrink: 0 }}>
          CLOUD<span style={{ color: '#6366f1' }}>CART</span>
        </h2>
        
        {/* Search Bar */}
        <div style={{ flex: 1, margin: '0 40px', maxWidth: '600px' }}>
          <input 
            type="text" 
            placeholder="Search premium products..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 20px', borderRadius: '12px', 
              border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white',
              outline: 'none'
            }}
          />
        </div>

        {/* Icons Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexShrink: 0 }}>
          {!isLoggedIn ? (
            <button 
              onClick={() => setShowLogin(true)} 
              className="add-btn" 
              style={{ padding: '8px 25px', fontSize: '14px' }}
            >
              Login
            </button>
          ) : (
            <div 
              title="Wishlist" 
              style={{ cursor: 'pointer', fontSize: '24px' }} 
              onClick={() => setIsWishlistOpen(true)}
            >
              ❤️
            </div>
          )}
          
          <div 
            title="Cart" 
            onClick={() => setIsCartOpen(true)} 
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <span style={{ fontSize: '28px' }}>🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge" style={{ background: '#6366f1', color: 'white', top: '-5px', right: '-8px' }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;