import React, { useContext } from "react";
import "./../../../css/header.css";
import Menu from "./menu";
import { Link } from "react-router-dom";
import SigninLoginBox from "./register/signin__login__box";
import Search from "./search";
import Basket from "./basket/basket.jsx";
import {getToken} from "./../../../services/authenticate"
import {addToFavourites, getFavourites, removeFromFavourites} from "./../../../services/userData"
import loginContext from "../../contexts/loginContext";
import {ReadTokenInformation} from "../../../services/ReadTokenInformation"


function index() {

  ReadTokenInformation();


  return (
    <div>
    <header>
      <div className="container">
        <div className="header__content">
        <div className="header__right">
            <Basket></Basket>
            <SigninLoginBox className1="regular"></SigninLoginBox>
          </div>
          <div className="header__left">
                <Search></Search>
            <div className="logo">
              <Link to="/">
                <img
                  src={require("./../../../assets/icons/logo.png")}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    <Menu></Menu>
  </div>
  )
}

export default index