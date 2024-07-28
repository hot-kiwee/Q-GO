import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css'; 

const Detail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [menuName, setMenuName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4007/menu/${id}`)
      .then(response => response.json())
      .then(data => {
        setMenuItem(data);
        setMenuName(data.title); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!menuItem) {
    return <div>메뉴 항목을 찾을 수 없습니다.</div>;
  }

  const handleAddToCart = () => {
    onAddToCart(menuItem);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); 
  };

  const handleCartClick = () => {
    navigate('/cart'); 
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="Detail">
      <header className="Detail-header">
        <button className="goBackButton" onClick={handleGoBack}>돌아가기</button>
        <h1>{menuName}</h1> 
        <button className="cartButton" onClick={handleCartClick}>장바구니</button>
      </header>
      <img src={menuItem.image} alt={menuItem.alt} className="Detail-image" />
      <div className="Detail-sashimi">{menuItem.sashimi}</div>
      <div className="Detail-price">
        <div className="price-label">가격</div>
        <div className="price-value">{menuItem.price}원</div>
      </div>
      <button className="orderButton" onClick={handleAddToCart}>장바구니에 담기</button>
      {showPopup && <div className="popup">장바구니에 담겼습니다!</div>}
    </div>
  );
};

export default Detail;
