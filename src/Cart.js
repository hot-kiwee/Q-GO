// Cart.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, onDeleteItem }) => {
  const [items, setItems] = useState(cartItems || []);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onDeleteItem(index);
  };

  const handleOrderClick = () => {
    navigate('/order'); 
  };

  return (
    <div className="Cart">
      <div className="cart-header">
        <h2>장바구니</h2>
        <div className="header-buttons">
          <button className="goBackButton" onClick={handleGoBack}>돌아가기</button>
        </div>
      </div>
      <div className="cart-items">
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.alt} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-price">{item.price}원</div>
                </div>
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteItem(index)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>장바구니에 상품이 없습니다.</p>
        )}
      </div>
      <div className="cart-footer">
        <button className="orderButton" onClick={handleOrderClick}>주문하기</button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default Cart;
