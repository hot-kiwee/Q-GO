import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Detail from './Detail';
import Cart from './Cart';
import Order from './Order'; 
import Menu from './Menu'; 
import cartIcon from './img/cart.png'; 

const App = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const location = useLocation();
  const navigate = useNavigate();
  const setMenuRef = useRef(null);
  const singleRef = useRef(null);
  const sashimiRef = useRef(null);
  const sideRef = useRef(null);
  const drinkRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/detail") || path.includes("/cart") || path.includes("/order")) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);

  const scrollToSection = (sectionRef) => {
    const offset = -100; 
    const elementPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleAddToCart = (item) => {
    setCartItems(prevCartItems => {
      const updatedCart = [...prevCartItems, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); 
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); 
  };

  const handleCompleteOrder = () => {
   
    handleClearCart();
    navigate('/'); 
  };

  const cartItemCount = cartItems.length; 

  return (
    <div className="App">
      {showHeader && (
        <header className="App-header">
          <div>대단한 초밥</div>
          <div className="Menu-buttons">
            <button className="Menu-button" onClick={() => scrollToSection(setMenuRef)}>세트메뉴</button>
            <button className="Menu-button" onClick={() => scrollToSection(singleRef)}>초밥 단품</button>
            <button className="Menu-button" onClick={() => scrollToSection(sashimiRef)}>사시미</button>
            <button className="Menu-button" onClick={() => scrollToSection(sideRef)}>사이드</button>
            <button className="Menu-button" onClick={() => scrollToSection(drinkRef)}>음료</button>
          </div>
          <div className="Cart-button">
            <button onClick={handleGoToCart} className="cart-button">
              <img src={cartIcon} alt="장바구니" className="cart-icon" />
              {cartItemCount > 0 && (
                <div className="cart-item-count">{cartItemCount}</div>
              )}
            </button>
          </div>
        </header>
      )}
      <Routes>
        <Route path="/" element={
          <>
            <div ref={setMenuRef}><Menu category="Setmenu" /></div>
            <div ref={singleRef}><Menu category="Single" /></div>
            <div ref={sashimiRef}><Menu category="Sashimi" /></div>
            <div ref={sideRef}><Menu category="Side" /></div>
            <div ref={drinkRef}><Menu category="Drink" /></div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onDeleteItem={handleDeleteItem} />} />
        <Route path="/order" element={<Order cartItems={cartItems} onCompleteOrder={handleCompleteOrder} />} /> 
      </Routes>
    </div>
  );
};

export default App;
