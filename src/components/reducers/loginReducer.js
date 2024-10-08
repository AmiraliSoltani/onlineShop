const loginReducer = (state, action) => {
  let index, count;
  switch (action.type) {

    case "openLogin":
      console.log("viewwwwwww 333333")
      if(state.modalLogin){
        console.log("opennnnnnnnnnnnnnnnnnnnnnnn")
        return {
         ...state
       }

      }
      return {
        ...state,
        modalLogin: true,
      };

      case "closeLogin":
        console.log("modalllllllllllllllllll clooooooooosed")

      return {
        ...state,
        modalLogin: false,
      };

    case "addFavorite":
      return {
        ...state,
        user: {
          ...state.user,
          popularProducts: [...state.user.popularProducts, action.payload], // Add to popularProducts array
        },
      };

    case "removeFavorite":
      return {
        ...state,
        user: {
          ...state.user,
          popularProducts: state.user.popularProducts.filter(
            (productId) => productId !== action.payload
          ),
        },
      };

    case "addNewProduct":
      console.log("caaaaaaaaaaaaaaaaaaaaaaaaart")
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };

    case "userLoggedIn":
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };

    case "userLoggedOut":
      return {
        ...state,
        authenticated: false,
        user: {},
      };

    case "deleteSpecificProduct":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (item) => item !== action.payload
        ),
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
      return { ...state, cartProducts: newCartProducts };

    case "deleteAllProducts":
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
      return { ...state, cartProducts: newCartProducts3 };

    // Add more actions as needed
    default:
      return state;
  }
};

export default loginReducer;
