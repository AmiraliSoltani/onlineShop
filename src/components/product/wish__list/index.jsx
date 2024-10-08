import React, { useState, useContext, useEffect } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { addToFavourites, removeFromFavourites } from '../../../services/userData';
import loginContext from '../../contexts/loginContext';
import cardContext from '../../contexts/cardContext';

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Add to my wish list
    </Tooltip>
  );
}

export const WishList = ({ productID, authenticated }) => {
  const { cardState, cardDispatch }  = useContext(cardContext);

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
  
    setIsToggled(authenticated && (cardState.favoriteProducts.includes(Number(productID))) )
  }, [cardState,productID]);


  const handleToggle = () => {
    addToWishList();
  };

  const addToWishList = () => {
    if (!authenticated) {
      toast.error('You need to sign up first', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!cardState.favoriteProducts.includes(Number(productID))) {
      setIsToggled(!isToggled); // Toggle the state
      toast.success('Successfully added to your wish list', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      cardDispatch({ type: "addFavorite", payload: Number(productID) });
    } else {
      setIsToggled(!isToggled); // Toggle the state
      toast.success('Removed from your list', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      cardDispatch({ type: "removeFavorite", payload: Number(productID) });
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <img
          className={`icon ${isToggled ? "":'black-white'}`} // Add 'black-white' class when toggled
          src={require("./../../../assets/icons/health-1.png")}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={handleToggle} // Handle the toggle on click
        />
      </OverlayTrigger>
    </>
  );
};

export default WishList;
