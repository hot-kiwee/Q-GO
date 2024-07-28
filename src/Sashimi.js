import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem'; // MenuItem 컴포넌트 임포트

function Sashimi() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/menu?category=sashimi')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="Menu">
      {items.lengtㅞh > 0 ? (
        items.map(item => (
          <MenuItem
            key={item.id}
            title={item.name}
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
}

export default Sashimi;
