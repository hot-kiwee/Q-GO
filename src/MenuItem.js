import React from 'react';

const MenuItem = ({ title, sashimi, price, image, alt, detailPath }) => (
  <div className="MenuItem" onClick={() => window.location.href = detailPath}>
    <div className="MenuItem-text">
      <div className="today-sushi">{title}</div>
      <div className="sashimi">{sashimi}</div>
      <div className="price">{price}원</div>
    </div>
    <img src={image} alt={alt} className="MenuItem-image" />
  </div>
);

export default MenuItem;
