import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import LoginModal from './components/LoginModal';
import DiscountModal from './components/DiscountModal';
import './index.css';



function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  useEffect(() => {
    // Backend se connect karne ki koshish
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error("Backend offline hai bhai!");
        // Dummy data agar backend band ho toh:
        setProducts([
          { id: 1, name: "Kubernetes Hoodie", price: 1200 },
          { id: 2, name: "Docker Mug", price: 450 },
          { id: 3, name: "ArgoCD Sticker Pack", price: 150 },
          { id: 4, name: "Helm Helmets", price: 2500 }
        ]);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => 
      prev.find(i => i.id === product.id) 
      ? prev.filter(i => i.id !== product.id) 
      : [...prev, product]
    );
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Navbar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
        cartCount={cart.length} setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen} isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
      />

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="product-grid">
          {filteredProducts.map(p => (
            <ProductCard 
              key={p.id} // Fixed: Unique key for each child
              product={p} 
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.some(item => item.id === p.id)}
            />
          ))}
        </div>
      </main>

      {/* Saare Modals Floating Containers mein hain */}
      {isCartOpen && <CartDrawer cart={cart} setIsCartOpen={setIsCartOpen} removeFromCart={removeFromCart} />}
      {isWishlistOpen && <WishlistDrawer wishlist={wishlist} setIsWishlistOpen={setIsWishlistOpen} addToCart={addToCart} toggleWishlist={toggleWishlist} />}
      {showLogin && <LoginModal setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} setShowDiscount={setShowDiscount} />}
      {showDiscount && <DiscountModal setShowDiscount={setShowDiscount} />}
    </div>
  );
}

export default App;