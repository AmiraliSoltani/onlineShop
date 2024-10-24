import React, { useContext, useEffect, useState } from 'react';
import './BottomMenu.scss';
import menuSearchContext from '../../contexts/menuSearchContext';
import { Link, useNavigate } from "react-router-dom";
import loginContext from '../../contexts/loginContext';
import { removeAuthenticateToken } from '../../../services/authenticate';
import cardContext from '../../contexts/cardContext';

const BottomMenu = () => {
  const { menuSearchState, menuSearchDispatch } = useContext(menuSearchContext);
  const {loginState, loginDispatch}= useContext(loginContext)
  const [labelUser, setLabelUser] = useState("My Account");
  const [showAccountAccordion, setShowAccountAccordion] = useState(false); // For handling the accordion
  
    const [activeIndex, setActiveIndex] = useState(-1); // Track the active menu item
    const navigate = useNavigate();
  const {cardState, cardDispatch}= useContext(cardContext)

  useEffect(() => {
    if (loginState.authenticated) {
      setLabelUser(loginState.user.name);
    } else {
      setLabelUser("My Account");
    }
  }, [loginState.authenticated]);

  useEffect(() => {
    if (!menuSearchState.MobileMenu) 
      setActiveIndex(-1)
  
  }, [menuSearchState.MobileMenu,]);

  useEffect(() => {
    if (! menuSearchState.Account) 
      setActiveIndex(-1)
  
  }, [ menuSearchState.Account]);


  const signoutUser=()=>{
    loginDispatch({type:"userLoggedOut"})
    removeAuthenticateToken()
    setShowAccountAccordion(false)
    setActiveIndex(-1)
  }

  let number =0;
cardState.cartProducts?.map(cart=>number+=cart?.count)


  const activeClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1); // Toggle off the active index
    } else {
      setActiveIndex(index); // Set new active index
    }
    menuSearchDispatch({ type: "closeMobileSearch" });

    if (index === 0) {
      if (menuSearchState.MobileMenu || menuSearchState.Account) {
        menuSearchDispatch({ type: "closeMobileMenu" });
        menuSearchDispatch({ type: "closeAccount" });
      }
      navigate("/");
    } else if (index === 2) {
      if (menuSearchState.MobileMenu || menuSearchState.Account) {
        menuSearchDispatch({ type: "closeMobileMenu" });
        menuSearchDispatch({ type: "closeAccount" });
      }
      navigate("/shoppingProcess");
    } else if (index === 1) {
      if (menuSearchState.Account) {
        menuSearchDispatch({ type: "closeAccount" });
      }
      menuSearchDispatch({ type: "toggleMobileMenu" });
    } else if (index === 3) {
            if (menuSearchState.MobileMenu) {
        menuSearchDispatch({ type: "closeMobileMenu" });
      }
      if (loginState.authenticated) {
        setShowAccountAccordion(!showAccountAccordion); // Toggle the accordion
      } else {
        menuSearchDispatch({ type: "toggleAccount" });
      }
    }
  };

  // Define your icons with and without the "active" state
  const icons = [
    { default: require('../../../assets/icons/home.png'), active: require('../../../assets/icons/home-active.png'), label: "Home Page" },
    { default: require('../../../assets/icons/menu.png'), active: require('../../../assets/icons/menu-active.png'), label: "Categories" },
    { default: require('../../../assets/icons/basket.png'), active: require('../../../assets/icons/basket-active.png'), label: "Shopping Cart" , badge: number },
    { default: require('../../../assets/icons/user.png'), active: require('../../../assets/icons/user-active.png'), label: labelUser }
  ];

  return (
    <div className="bottom-menu">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`menu-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => activeClick(index)} // Set active index on click
        >
          <img
            src={activeIndex === index ? icon.active : icon.default} // Show active icon if it's selected, else show default
            alt={icon.label}
            className="menu-icon"
          />
          <span>{icon.label}</span>
          {icon.badge==0 && (
      <span className="badge">{icon.badge}</span>
    )}
           {icon.badge>0 && (
      <span className="badge">{icon.badge}</span>
    )}
        </div>
      ))}

      {/* Accordion for account options */}
      {activeIndex === 3 && showAccountAccordion && (
        <div className="account-accordion">
          <ul>
            <li>My Account</li>
            <li>My Wish List</li>
            <li>My Orders</li>
            <li><button onClick={signoutUser}>Sign Out</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BottomMenu;


