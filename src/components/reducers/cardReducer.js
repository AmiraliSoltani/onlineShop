import { getAuthenticateToken } from "../../services/authenticate";
import { addToFavourites, addToLastSearches, addToLastVisited, removeFromFavourites, removelastSearches, replaceLastSearches, replaceLastVisited, replaceShoppingCard } from "../../services/userData";




const CardsReducer = (state, action) => {
  switch (action.type) {

  

    case "addVisitedProductAtBeginning":
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      const productIdToAdd = action.payload; // Assuming action.payload contains productId
    if(!productIdToAdd)  {
      return {
        ...state,
      };
    }

      // Check if the produfgtctIdToAdd already exists in the lastVisitedProducts array
      const updatedVisitedProducts = state.lastVisitedProducts.filter(
        (productId) => productId !== productIdToAdd
      );

      // Move the productIdToAdd to the last index
      updatedVisitedProducts.unshift(Number(productIdToAdd));
      localStorage.setItem(
        "savedLastVisitedProducts",
        JSON.stringify(updatedVisitedProducts)
      );
      if (getAuthenticateToken) addToLastVisited(Number(productIdToAdd));

      return {
        ...state,
        lastVisitedProducts: updatedVisitedProducts,
      };


      case "replacVisitedProducts":
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
      const replacedVisitedProducts = action.payload; // Assuming action.payload contains productId
      return {
        ...state,
        lastVisitedProducts: replacedVisitedProducts,
      };

      case "mergeLastVisitedProducts":
  const { localVisitedProduct, backendVisitedProduct } = action.payload;
console.log("hccccccccccccc", backendVisitedProduct,localVisitedProduct,)
  // Merge and remove duplicates based on product ID
  const mergedVisitedProducts = [
    ...localVisitedProduct, // Local storage visited products come first
    ...backendVisitedProduct.filter(
      (backendProduct) =>
        !localVisitedProduct.some(
          (localProduct) => localProduct === backendProduct
        )
    ),
  ];

  // Save merged visited products to localStorage
  localStorage.setItem(
    "savedLastVisitedProducts",
    JSON.stringify(mergedVisitedProducts)
  );

  // Optionally, update the backend with merged visited products
  if (getAuthenticateToken()) {
    replaceLastVisited(mergedVisitedProducts);
  }

  return {
    ...state,
    lastVisitedProducts: mergedVisitedProducts,
  };


      case "mergeLastSearches":
      const { localSearches, backendSearches } = action.payload;

      // Merge and remove duplicates based on mainWord
      const mergedSearches = [
        ...localSearches, // Local storage searches come first
        ...backendSearches.filter(
          (backendSearch) =>
            !localSearches.some(
              (localSearch) => localSearch.mainWord === backendSearch.mainWord
            )
        ),
      ];
      // Save merged searches to localStorage
      localStorage.setItem("savedLastSearches", JSON.stringify(mergedSearches));

      // Optionally, update the backend with merged searches
      if (getAuthenticateToken()) {
        replaceLastSearches(mergedSearches)
      }

      return {
        ...state,
        lastSearches: mergedSearches,
      };


      case "addLastSearches":
        console.log("searchhhhhhhhhhhhhhh2222222","amiiiiiiiiiir")


        const searchObject = action.payload; // Assuming action.payload contains productId
        
        console.log("searchhhhhhhhhhhhhhh", 'state.lastSearches',state.lastSearches)
        console.log("searchhhhhhhhhhhhhhh", 'state.lastSearches',searchObject)
        
        // Check if the produfgtctIdToAdd already exists in the lastVisitedProducts array
        
        const updatedLastSearches = state.lastSearches?.filter(
          (search) => search.mainWord != searchObject.mainWord
        );
  
        // Move the productIdToAdd to the last index
        updatedLastSearches.unshift(searchObject);
        localStorage.setItem(
          "savedLastSearches",
          JSON.stringify(updatedLastSearches)
        );
        if (getAuthenticateToken) addToLastSearches(searchObject);
  
        return {
          ...state,
          lastSearches: updatedLastSearches,
        };
  
        case "deleteAllLastSearches":
  console.log("Deleting all last searches...");

  // Clear searches from localStorage
  //localStorage.removeItem("savedLastSearches");
  localStorage.setItem("savedLastSearches", JSON.stringify([]));


  // Call backend API to clear last searches
  if (getAuthenticateToken)  removelastSearches() // Backend call to delete

  return {
    ...state,
    lastSearches: [],
  };

  case "replaceLastSearches":
    const updatedLastSearchesReplace = action.payload;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbvvvvvvvvvvvvvvvvvv");
    return {
      ...state,
      lastSearches: updatedLastSearchesReplace,
    };

    case "setfavoriteProducts":
      const updatedFavoriteProducts = action.payload;
      console.log("bbbbbbbbbbbbbbbbbbbbbbbvvvvvvvvvvvvvvvvvv");
      return {
        ...state,
        favoriteProducts: updatedFavoriteProducts,
      };
      case "addFavorite":
        addToFavourites(action.payload);
        return {
            ...state,
            favoriteProducts: [...state.favoriteProducts, action.payload], // Add to popularProducts array
        };
  
      case "removeFavorite":
        removeFromFavourites(action.payload);
        return {
            ...state,
            favoriteProducts: state.favoriteProducts.filter(
              (productId) => productId !== action.payload
            ),
        };

    // case "addVisitedProductAtEnd":
    //   const productID = action.payload; // Assuming action.payload contains productId

    //   // Check if the productIdToAdd already exists in the lastVisitedProducts array
    //   const isProductIdExist2 = state?.lastVisitedProducts.includes(productID);

    //   // If the productIdToAdd doesn't exist, add it at the end of the array
    //   if (!isProductIdExist2) {
    //     const updatedVisitedProducts2 = [
    //       ...state?.lastVisitedProducts.slice(1),
    //       productID,
    //     ]; // Add productId to the end

    //     // Update local storage with the updated array
    //     localStorage.setItem(
    //       "savedLastVisitedProducts",
    //       JSON.stringify(updatedVisitedProducts2)
    //     );

    //     return {
    //       ...state,
    //       lastVisitedProducts: updatedVisitedProducts2,
    //     };
    //   }
    //   break;

    // case "addNewProduct":
    //   const updatedCartAdd = [...state.cartProducts, action.payload];
    //   console.log("?????????????????????????????????",updatedCartAdd)
    //   localStorage.setItem("savedCartProducts", JSON.stringify(updatedCartAdd));
    //   console.log("yeeeeee");
    //   //if (getAuthenticateToken) replaceShoppingCard(updatedCartAdd);
    //   return {
    //     ...state,
    //     cartProducts: updatedCartAdd,
    //   };

    // case "addNewProduct":
    //   // Check if the product with the same ID, size, and color already exists in the cart
    //   const productExists = state.cartProducts.some(
    //     (item) =>
    //       item.product._id === action.payload.product._id &&
    //       item.size === action.payload.size &&
    //       JSON.stringify(item.color) === JSON.stringify(action.payload.color)
    //   );
    
    //   let updatedCartAdd;
    
    //   if (!productExists) {
    //     // If the product with the same size and color doesn't exist, add it to the cart
    //     updatedCartAdd = [...state.cartProducts, action.payload];
    //     console.log("Product added to cart:", updatedCartAdd);
    
    //     // Update localStorage
    //     localStorage.setItem("savedCartProducts", JSON.stringify(updatedCartAdd));
    //     if (getAuthenticateToken) replaceShoppingCard(updatedCartAdd)
    //     console.log("Cart saved to localStorage");
    //   } else {
    //     // If the product exists, keep the cart as it is
    //     updatedCartAdd = state.cartProducts;
    //     console.log("Product already in cart with the same size and color, no action taken");
    //   }
    
    //   return {
    //     ...state,
    //     cartProducts: updatedCartAdd,
    //   };

    case "addNewProduct":
  // Check if the product with the same ID, size, and color already exists in the cart
  const productExists = state.cartProducts.some(
    (item) =>
      item.product._id === action.payload.product._id &&
      item.size === action.payload.size &&
      JSON.stringify(item.color) === JSON.stringify(action.payload.color)
  );

  let updatedCartAdd;

  if (!productExists) {
    // If the product with the same size and color doesn't exist, add it to the cart
    updatedCartAdd = [...state.cartProducts, action.payload];
    console.log("Product added to cart:", updatedCartAdd);

    // Update localStorage
    localStorage.setItem("savedCartProducts", JSON.stringify(updatedCartAdd));
    console.log("Cart saved to localStorage");

    // Sync with backend if the user is authenticated
    if (getAuthenticateToken()) {
      replaceShoppingCard(updatedCartAdd);
      console.log("Cart synced with backend");
    }
  } else {
    // If the product exists, keep the cart as it is
    updatedCartAdd = state.cartProducts;
    console.log("Product already in cart with the same size and color, no action taken");
  }

  return {
    ...state,
    cartProducts: updatedCartAdd,
  };

    
  case "replaceShoppingCart":
    const updatedShoppingCartReplace = action.payload;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbvvvvvvvvvvvvvvvvvv");
    return {
      ...state,
      cartProducts: updatedShoppingCartReplace,
    };

    case "replaceCart":
      const updatedCartReplace = action.payload;
      console.log("bbbbbbbbbbbbbbbbbbbbbbbvvvvvvvvvvvvvvvvvv");
      return {
        ...state,
        cartProducts: updatedCartReplace,
      };

    case "deleteSpecificProduct":
      const updatedCartDelete = state.cartProducts.filter(
        (item) => item !== action.payload
      );
      localStorage.setItem(
        "savedCartProducts",
        JSON.stringify(updatedCartDelete)
      );
      if (getAuthenticateToken) replaceShoppingCard(updatedCartDelete);

      return {
        ...state,
        cartProducts: updatedCartDelete,
      };

    case "addExistProduct":
      const newCartProducts = state.cartProducts.map((order) => {
        if (
          order.product._id === action.payload.product._id &&
          order.color[0] === action.payload.color[0] &&
          order.size === action.payload.size
        ) {
          return {
            ...order,
            count: order.count + action.payload.count,
          };
        }
        // For other items, return them as is
        return order;
      });
      localStorage.setItem(
        "savedCartProducts",
        JSON.stringify(newCartProducts)
      );
      if (getAuthenticateToken) replaceShoppingCard(newCartProducts);

      return { ...state, cartProducts: newCartProducts };

    case "deleteAllProducts":
      localStorage.setItem("savedCartProducts", JSON.stringify([]));
      return {
        ...state,
        cartProducts: [],
      };

    case "increment":
      const newCartProducts2 = state.cartProducts.map((order) => {
        if (
          order.product._id === action.payload.product._id &&
          order.color === action.payload.color &&
          order.size === action.payload.size
        ) {
          return {
            ...order,
            count: order.count + 1,
          };
        }
        // For other items, return them as is
        return order;
      });
      localStorage.setItem(
        "savedCartProducts",
        JSON.stringify(newCartProducts2)
      );
      if (getAuthenticateToken) replaceShoppingCard(newCartProducts2);

      return { ...state, cartProducts: newCartProducts2 };

    case "decrement":
      const newCartProducts3 = state.cartProducts.map((order) => {
        if (
          order.product._id === action.payload.product._id &&
          order.color === action.payload.color &&
          order.size === action.payload.size
        ) {
          return {
            ...order,
            count: order.count - 1,
          };
        }
        // For other items, return them as is
        return order;
      });
      localStorage.setItem(
        "savedCartProducts",
        JSON.stringify(newCartProducts3)
      );
      if (getAuthenticateToken) replaceShoppingCard(newCartProducts3);

      return { ...state, cartProducts: newCartProducts3 };

    // Add more actions as needed

    default:
      // Retrieve saved cartProducts from localStorage on default
      const savedCart =
        JSON.parse(localStorage.getItem("savedCartProducts")) || [];

      return {
        ...state,
        cartProducts: savedCart,
      };
  }
};

export default CardsReducer;

// const CardsReducer = (state, action) => {
//   let index, count;
//   switch (action.type) {
//     case "addVisitedProduct":
//       const productIdToAdd = action.payload; // Assuming action.payload contains productId

//       // Check if the productIdToAdd already exists in the lastVisitedProducts array
//       const updatedVisitedProducts = state.lastVisitedProducts.filter(
//         (productId) => productId !== productIdToAdd
//       );

//       // Move the productIdToAdd to the last index
//       updatedVisitedProducts.push(productIdToAdd);

//       return {
//         ...state,
//         lastVisitedProducts: updatedVisitedProducts,
//       };

//     case "addNewProduct":
//       return {
//         ...state,
//         cartProducts: [...state.cartProducts, action.payload],
//       };

//     case "deleteSpecificProduct":
//       return {
//         ...state,
//         cartProducts: state.cartProducts.filter(
//           (item) => item !== action.payload
//         ),
//       };
//     case "addExistProduct":
//       const newCartProducts = state.cartProducts.map((order) => {
//         if (
//           order.product._id === action.payload.product._id &&
//           order.color[0] === action.payload.color[0] &&
//           order.size === action.payload.size
//         ) {
//           return {
//             ...order,
//             count: order.count + action.payload.count,
//           };
//         }
//         // For other items, return them as is
//         return order;
//       });
//       return { ...state, cartProducts: newCartProducts };

//     case "deleteAllProducts":
//       return {
//         ...state,
//         cartProducts: [],
//       };

//     case "increment":
//       const newCartProducts2 = state.cartProducts.map((order) => {
//         if (
//           order.product._id === action.payload.product._id &&
//           order.color === action.payload.color &&
//           order.size === action.payload.size
//         ) {
//           return {
//             ...order,
//             count: order.count + 1,
//           };
//         }
//         // For other items, return them as is
//         return order;
//       });
//       return { ...state, cartProducts: newCartProducts2 };

//     case "decrement":
//       const newCartProducts3 = state.cartProducts.map((order) => {
//         if (
//           order.product._id === action.payload.product._id &&
//           order.color === action.payload.color &&
//           order.size === action.payload.size
//         ) {
//           return {
//             ...order,
//             count: order.count - 1,
//           };
//         }
//         // For other items, return them as is
//         return order;
//       });
//       return { ...state, cartProducts: newCartProducts3 };

//     // Add more actions as needed
//     default:
//       return state;
//   }
// };

// export default CardsReducer;
