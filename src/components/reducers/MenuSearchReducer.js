const MenuSearchReducer = (state, action) => {
  switch (action.type) {
    case "toggleMenu":
      state.menu = !state.menu;
      break;
    case "toggleSearch":
      state.search = !state.search;
      break;
    default:
      return null;
  }
};

export default MenuSearchReducer;
