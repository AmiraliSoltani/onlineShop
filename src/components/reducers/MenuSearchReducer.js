const MenuSearchReducer = (state, action) => {
  switch (action.type) {
    case "closeMenu":
      state.menu.open = true;
      break;
    case "openMenu":
      state.menu.open = false;
      break;
    case "openSearch":
      state.search.open = true;
      break;
    case "closeSearch":
      state.search.open = false;
      break;
    default:
      return null;
  }
};

export default MenuSearchReducer;
