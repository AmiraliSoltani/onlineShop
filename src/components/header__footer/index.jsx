import React, { useReducer } from "react";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import CardsReducer from "../reducers/cardReducer";
import cardContext from "../contexts/cardContext";
import loginContext from "../contexts/loginContext";
import blurContext from "../contexts/blur";
import menuSearchContext from "../contexts/menuSearchContext";
import MenuSearchReducer from "../reducers/MenuSearchReducer";
import loginReducer from "../reducers/loginReducer";
import blurReducer from "../reducers/blurReducer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HeaderFooter() {
  const initialCardState = {
    cartProducts:[],
    lastVisitedProducts:[],
    lastSearches:[],
   favoriteProducts:[],
  };
  const initialLoginState = {
    authenticated:false,
    user:{},
    modalLogin:false,
  };
  const initialMenuSearchState = {
    menu:false,
    search:false
  };
  const initialblurState = {
    blur:false,
  };
  const [cardState, cardDispatch] = useReducer(CardsReducer, initialCardState);
  const [menuSearchState, menuSearchDispatch] = useReducer(MenuSearchReducer, initialMenuSearchState);
  const [loginState, loginDispatch] = useReducer(loginReducer, initialLoginState);
  const [blurState, blurDispatch] = useReducer(blurReducer, initialblurState);


  return (
      <>
            <blurContext.Provider value={{ blurState, blurDispatch }}>
      <cardContext.Provider value={{ cardState, cardDispatch }}>
      <menuSearchContext.Provider value={{ menuSearchState, menuSearchDispatch }}>
        <loginContext.Provider value={{ loginState, loginDispatch }} >
        <Header />
        <Outlet/>
        <Footer />
        <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </loginContext.Provider>
      </menuSearchContext.Provider>
      </cardContext.Provider>
      </blurContext.Provider>

      </>
  )
}

export default HeaderFooter



