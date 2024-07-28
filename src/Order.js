import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Order.css'; // 스타일을 추가할 수 있습니다.

const paymentOptions = [
  { id: 1, title: '신용카드/선불' },
  { id: 2, title: '토스페이' },
  { id: 3, title: '카운터에서 결제(후불)' },
  { id: 4, title: '네이버페이' },
  { id: 5, title: '카카오페이' },
  { id: 6, title: '삼성페이' }
];

const Order = ({ onCompleteOrder }) => {
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const handleOptionClick = (id) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = new Set(prevSelectedOptions);
      if (newSelectedOptions.has(id)) {
        newSelectedOptions.delete(id);
      } else {
        newSelectedOptions.add(id);
      }
      return newSelectedOptions;
    });
  };

  const handleCompleteOrder = () => {
    onCompleteOrder(); 
  };

  return (
    <div className="Order">
      <header className="Order-header">
        <h2>주문하기</h2>
      </header>
      <ul className="payment-options">
        {paymentOptions.map(option => (
          <li
            key={option.id}
            className="payment-option"
            onClick={() => handleOptionClick(option.id)}
          >
            <div className="payment-option-label">
              <div
                className={`checkbox ${selectedOptions.has(option.id) ? 'checked' : ''}`}
              />
              <div className="payment-option-title">{option.title}</div>
            </div>
          </li>
        ))}
      </ul>
      <button className="complete-order-button" onClick={handleCompleteOrder}>
        주문 완료
      </button>
    </div>
  );
};

Order.propTypes = {
  onCompleteOrder: PropTypes.func.isRequired,
};

export default Order;
