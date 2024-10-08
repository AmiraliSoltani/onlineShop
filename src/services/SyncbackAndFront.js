import React, { useContext, useEffect } from "react";
import loginContext from "../components/contexts/loginContext";
import { getAuthenticateToken, readAuthenticateToken } from "./authenticate";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
  replaceShoppingCard,
} from "./userData";
import cardContext from "../components/contexts/cardContext";

function SyncbackAndFront() {
  console.log("hiiiiiiiiiiiiiiiiiii");
  const { loginState, loginDispatch } = useContext(loginContext);
  const { cardState, cardDispatch } = useContext(cardContext);

    const decodedToken = readAuthenticateToken();



    console.log("hccccccccccccc decodedToken", decodedToken , "hhhhhhhhhhhhh localStorage",localStorage);
    // Last Search Sync
    const localSearches =
      JSON.parse(localStorage.getItem("savedLastSearches")) || [];
    const backendSearches = decodedToken.lastSearches || [];
    cardDispatch({
      type: "mergeLastSearches",
      payload: { localSearches, backendSearches },
    });

    // Last visited products sync
    const localVisitedProduct =
      JSON.parse(localStorage.getItem("savedLastVisitedProducts")) || [];
    const backendVisitedProduct = decodedToken.lastVisitedProducts || [];
    console.log("hcccccccccc","localVisitedProduct",localVisitedProduct)
    cardDispatch({
      type: "mergeLastVisitedProducts",
      payload: { localVisitedProduct, backendVisitedProduct },
    });

    // Shopping cart sync
    const localShoppingCart =
      JSON.parse(localStorage.getItem("savedCartProducts")) || [];
    const backendShoppingCart = decodedToken.shoppingCart || [];
    if (localShoppingCart.length > 0) {
      cardDispatch({ type: "replaceShoppingCart", payload: localShoppingCart });
      replaceShoppingCard(localShoppingCart);
    } else if (backendShoppingCart.length > 0) {
      localStorage.setItem(
        "savedCartProducts",
        JSON.stringify(backendShoppingCart)
      );
      cardDispatch({
        type: "replaceShoppingCart",
        payload: backendShoppingCart,
      });
    }

    // Popular products sync
    const backendFavoriteProduct = decodedToken.popularProducts || [];
    cardDispatch({
      type: "setfavoriteProducts",
      payload: backendFavoriteProduct,
    });
}

export default SyncbackAndFront;
