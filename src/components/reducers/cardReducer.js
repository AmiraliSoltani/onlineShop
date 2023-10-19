const CardsReducer = (state, action) => {
  let index, number;
  switch (action.type) {
    case "addNewProduct":
      state.cartProducts.push(action.payload);
      //return { ...state, cartItems: [...state.cartItems, action.payload] };
      break;
    case "deleteSpecificProduct":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "addExistProduct":
      index = action.payload.index;
      number = action.payload.number;
      state.cartProducts[index].number += number;
      break;

    case "deleteAllProducts":
      state.cartProducts = [];
      break;

    case "increment":
      index = state.cartProducts.indexOf(...action.payload);
      state.cartProducts[index].number += 1;
      break;

    case "decrement":
      index = state.cartProducts.indexOf(...action.payload);
      state.cartProducts[index].number -= 1;
      break;

    // Add more actions as needed
    default:
      return state;
  }
};

export default CardsReducer;
