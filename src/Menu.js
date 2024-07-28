import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem'; // MenuItem 컴포넌트 임포트

const Menu = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4007/menu?category=${category}`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [category]);

  return (
    <div className="Menu">
      {items.length > 0 ? (
        items.map(item => (
          <MenuItem
            key={item.id}
            title={item.menuId}
            sashimi={item.description}
            price={item.price}
            image={item.image}
            alt={item.name}
            detailPath={`/detail/${item.id}`}
          />
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default Menu;
