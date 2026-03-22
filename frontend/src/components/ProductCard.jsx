import React from 'react';

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => {
  return (
    <div className="product-card animate-card">
      {/* Product Image & Wishlist Icon */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
        <div className="product-img" style={{ 
          height: '220px', 
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '70px',
          transition: 'transform 0.5s ease'
        }}>
          📦
        </div>

        {/* Wishlist Tooltip Icon */}
        <div 
          onClick={() => toggleWishlist(product)} 
          data-tooltip={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          style={{ 
            position: 'absolute', 
            top: '15px', 
            right: '15px', 
            cursor: 'pointer', 
            fontSize: '24px', 
            background: 'white', 
            borderRadius: '50%', 
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          className="wishlist-btn"
        >
          {isWishlisted ? '❤️' : '🤍'}
        </div>
      </div>

      {/* Product Details Section */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ 
              fontSize: '11px', 
              color: '#6366f1', 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Tech Gear
            </span>
            <h3 style={{ 
              fontSize: '18px', 
              margin: '5px 0', 
              color: '#1e293b',
              fontWeight: '700'
            }}>
              {product.name}
            </h3>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '20px' 
        }}>
          <p style={{ 
            color: '#0f172a', 
            fontSize: '24px', 
            fontWeight: '900', 
            margin: 0 
          }}>
            ₹{product.price}
          </p>
          
          <button 
            onClick={() => addToCart(product)} 
            className="add-btn"
            title="Add to your cart"
            style={{ 
              padding: '12px 20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Add 🛒
          </button>
        </div>
      </div>

      {/* Simple Inline CSS for Component-specific animations */}
      <style>{`
        .product-card:hover .product-img {
          transform: scale(1.1);
        }
        .wishlist-btn:hover {
          transform: scale(1.2);
          background-color: #f8fafc;
        }
        .animate-card {
          animation: cardEntrance 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;