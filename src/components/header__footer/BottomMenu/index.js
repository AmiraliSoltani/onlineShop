import React, { useState } from 'react';
import './BottomMenu.scss';

const BottomMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active menu item

  // Define your icons with and without the "active" state
  const icons = [
    { default: require('../../../assets/icons/home.png'), active: require('../../../assets/icons/home-active.png'), label: "Home Page" },
    { default: require('../../../assets/icons/menu.png'), active: require('../../../assets/icons/menu-active.png'), label: "Categories" },
    { default: require('../../../assets/icons/basket.png'), active: require('../../../assets/icons/basket-active.png'), label: "Shopping Cart" },
    { default: require('../../../assets/icons/user.png'), active: require('../../../assets/icons/user-active.png'), label: "My Account" }
  ];

  return (
    <div className="bottom-menu">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`menu-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => setActiveIndex(index)} // Set active index on click
        >
          <img
            src={activeIndex === index ? icon.active : icon.default} // Show active icon if it's selected, else show default
            alt={icon.label}
            className="menu-icon"
          />
          <span>{icon.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomMenu;
