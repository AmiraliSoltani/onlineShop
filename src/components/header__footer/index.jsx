import React, { useReducer } from "react";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import CardsReducer from "../reducers/cardReducer";
import cardContext from "../contexts/cardContext"
import menuSearchContext from "../contexts/menuSearchContext";
import MenuSearchReducer from "../reducers/MenuSearchReducer";

function HeaderFooter() {
  const initialCardState = {
    cartProducts:[]
  };
  const initialMenuSearchState = {
    menu:false,
    search:false
  };
  const [cardState, cardDispatch] = useReducer(CardsReducer, initialCardState);
  const [menuSearchState, menuSearchDispatch] = useReducer(MenuSearchReducer, initialMenuSearchState);

  return (
      <>
      <cardContext.Provider value={{ cardState, cardDispatch }}>
      <menuSearchContext.Provider value={{ menuSearchState, menuSearchDispatch }}>
        <Header />
        <Outlet/>
        <Footer />
      </menuSearchContext.Provider>
      </cardContext.Provider>
      </>
  )
}

export default HeaderFooter



