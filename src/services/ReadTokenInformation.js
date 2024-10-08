

import React, { useContext, useEffect, useState } from "react";
import loginContext from "../components/contexts/loginContext";
import { getAuthenticateToken, readAuthenticateToken } from "./authenticate";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from "./userData";
import cardContext from "../components/contexts/cardContext";
import SyncbackAndFront from "./SyncbackAndFront";

function ReadTokenInformation() {
  const { loginState, loginDispatch } = useContext(loginContext);
  const { cardState, cardDispatch } = useContext(cardContext);
  const decodedToken = readAuthenticateToken();

  if (!loginState.authenticated && getAuthenticateToken()) {
    loginDispatch({ type: "userLoggedIn", payload: decodedToken });
    SyncbackAndFront()
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh111111111111111111")
    // const decodedToken = readAuthenticateToken();
    // console.log("nnnnnnnnnnnnnnnnnnnnnhereeeeeeeeee21212",decodedToken);

    // // Deduplicate shoppingCart to avoid adding duplicates
    // let uniqueShoppingCart=[]
    // if(decodedToken.shoppingCart?.length>0){

    //   uniqueShoppingCart = decodedToken.shoppingCart.filter(
    //    (item, index, self) =>
    //      index ===
    //      self.findIndex(
    //        (t) => 
    //          t.product._id === item.product._id && 
    //          t.size === item.size && 
    //          t.color === item.color
    //      )
    //  );
    // }

    // loginDispatch({ type: "userLoggedIn", payload: decodedToken });

    // for (let i = 0; i < uniqueShoppingCart.length; i++) {
    //   if (
    //     cardState.cartProducts.length > 0 &&
    //     cardState.cartProducts.find(
    //       (oldOrder) =>
    //         oldOrder.product._id === uniqueShoppingCart[i].product._id &&
    //         oldOrder.size === uniqueShoppingCart[i].size &&
    //         oldOrder.color === uniqueShoppingCart[i].color
    //     )
    //   ) {
    //     // Logic for existing product in cart
    //     console.log("repetetive")
    //   } else {
    //     console.log("i", i, cardState.cartProducts);
    //     console.log("i", i, cardState.cartProducts);

    //     cardDispatch({
    //       type: "addNewProduct",
    //       payload: uniqueShoppingCart[i],
    //     });
    //   }
    // }

    // for (let i = 0; i < decodedToken.lastVisitedProducts?.length; i++) {
    //   cardDispatch({
    //     type: "addVisitedProductAtEnd",
    //     payload: decodedToken.lastVisitedProducts[i],
    //   });
    // }

    // console.log("took", decodedToken);




  } else if (!loginState.authenticated && !getAuthenticateToken()) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh22222222222222222")

    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");

    const savedLastSearches = JSON.parse(
      localStorage.getItem("savedLastSearches")
    );

    const savedCartProducts = JSON.parse(
      localStorage.getItem("savedCartProducts")
    );
    const savedLastVisitedProducts = JSON.parse(
      localStorage.getItem("savedLastVisitedProducts")
    );

    if (cardState.lastVisitedProducts.length == 0 && savedLastVisitedProducts?.length > 0) {
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      cardDispatch({
        type: "replacVisitedProducts",
        payload: savedLastVisitedProducts,
      });
    }

    if (cardState.cartProducts.length === 0 && savedCartProducts?.length > 0) {
      console.log("mmmmmmmm");
      cardDispatch({
        type: "replaceCart",
        payload: savedCartProducts,
      });
    }

    if (cardState.lastSearches.length === 0 && savedLastSearches?.length > 0) {
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      cardDispatch({
        type: "replaceLastSearches",
        payload: savedLastSearches,
      });
    }
  }
}

export { ReadTokenInformation };


// import React, { useContext, useEffect, useState } from "react";
// import loginContext from "../components/contexts/loginContext";
// import { getAuthenticateToken, readAuthenticateToken } from "./authenticate";
// import {
//   addToFavourites,
//   getFavourites,
//   removeFromFavourites,
// } from "./userData";
// import cardContext from "../components/contexts/cardContext";

// function ReadTokenInformation() {
//   const { loginState, loginDispatch } = useContext(loginContext);
//   const { cardState, cardDispatch } = useContext(cardContext);
  
//   if (!loginState.authenticated && getAuthenticateToken()) {
//     const decodedToken = readAuthenticateToken();
//     console.log("nnnnnnnnnnnnnnnnnnnnnhereeeeeeeeee21212",decodedToken.shoppingCart)
//     loginDispatch({ type: "userLoggedIn", payload: decodedToken });
//     for (let i = 0; i < decodedToken.shoppingCart.length; i++) {
//       if (
//         cardState.cartProducts.length > 0 &&
//         cardState.cartProducts.find(
//           (oldOrder) =>
//             oldOrder.product._id === decodedToken.shoppingCart[i].product._id
//         )
//       ) {
//         // Logic for existing product in cart
//       } else {
//         console.log("i",i,cardState.cartProducts)
//         cardDispatch({
//           type: "addNewProduct",
//           payload: decodedToken.shoppingCart[i],
//         });
//       }
//     }

//     for (let i = 0; i < decodedToken.lastVisitedProducts.length; i++) {
//       cardDispatch({
//         type: "addVisitedProductAtEnd",
//         payload: decodedToken.lastVisitedProducts[i],
//       });
//     }

//     console.log("took", decodedToken);
//   } else if (!loginState.authenticated && !getAuthenticateToken()) {
//     console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvv");

//     const savedCartProducts = JSON.parse(
//       localStorage.getItem("savedCartProducts")
//     );
//     const savedLastVisitedProducts = JSON.parse(
//       localStorage.getItem("lastVisitedProducts")
//     );
//     if (cardState.cartProducts.length === 0 && savedCartProducts?.length > 0) {
//       console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
//       cardDispatch({
//         type: "replaceCart",
//         payload: savedCartProducts,
//       });
//     }
//   }
// }
// export { ReadTokenInformation };

// const ReadTokenInformation = () => {
//   const { loginState, loginDispatch } = useContext(loginContext);
//   const { cardState, cardDispatch } = useContext(cardContext);

//   useEffect(() => {
//     if (!loginState.authenticated && getToken()) {
//       const decodedToken = readToken();
//       loginDispatch({ type: "userLoggedIn", payload: decodedToken });
//       for (let i = 0; i < decodedToken.shoppingCart.length; i++) {
//         if (
//           cardState.cartProducts.length > 0 &&
//           cardState.cartProducts.find(
//             (oldOrder) =>
//               oldOrder.product._id ===
//                 decodedToken.shoppingCart[i].product._id &&
//               oldOrder.color[0] === decodedToken.shoppingCart[i].color[0] &&
//               oldOrder.size === decodedToken.shoppingCart[i].size
//           )
//         ) {
//           // Logic for existing product in cart
//         } else {
//           cardDispatch({
//             type: "addNewProduct",
//             payload: decodedToken.shoppingCart[i],
//           });
//         }
//       }
//       console.log("took", decodedToken);
//     }
//   }, [loginState, cardState, loginDispatch, cardDispatch]);

//   return null; // Or any valid JSX if needed
// };

// export default ReadTokenInformation;

// import { useContext } from "react";
// import loginContext from "../components/contexts/loginContext";
// import { getToken, readToken } from "./authenticate";
// import {
//   addToFavourites,
//   getFavourites,
//   removeFromFavourites,
// } from "./userData";
// import cardContext from "../components/contexts/cardContext";

// export default function ReadTokenInformation() {
//   console.log("hooooooooooooooooooooooooooooooooooooooo");
//   // Perform various tasks here
//   const { loginState, loginDispatch } = useContext(loginContext);
//   const { cardState, cardDispatch } = useContext(cardContext);

//   if (!loginState.authenticated && getToken()) {
//     const decodedToken = readToken();
//     loginDispatch({ type: "userLoggedIn", payload: decodedToken });
//     for (let i = 0; i < decodedToken.shoppingCart.length; i++) {
//       if (
//         cardState.cartProducts.length > 0 &&
//         cardState.cartProducts.find(
//           (oldOrder) =>
//             oldOrder.product._id === decodedToken.shoppingCart[i].product._id &&
//             oldOrder.color[0] === decodedToken.shoppingCart[i].color[0] &&
//             oldOrder.size === decodedToken.shoppingCart[i].size
//         )
//       ) {
//       } else {
//         cardDispatch({
//           type: "addNewProduct",
//           payload: decodedToken.shoppingCart[i],
//         });
//       }
//     }
//     console.log("took", decodedToken);
//   }
//   return <></>;
// }
