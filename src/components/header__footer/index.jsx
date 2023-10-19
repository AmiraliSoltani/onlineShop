import React, { useReducer } from "react";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import CardsReducer from "../reducers/cardReducer";
import cardContext from "../contexts/cardContext"

function HeaderFooter() {
  const initialState = {
    cartProducts:[]
  };
  const [state, dispatch] = useReducer(CardsReducer, initialState);
  return (
      <>
      <cardContext.Provider value={{ state, dispatch }}>
        <Header />
        <Outlet/>
        <Footer />
      </cardContext.Provider>
      </>
  )
}

export default HeaderFooter



