const MenuSearchReducer = (state, action) => {
  switch (action.type) {
    case "toggleMenu":
      return { ...state, menu: !state.menu };
    case "toggleSearch":
      return { ...state, search: !state.search };
    case "toggleMobileMenu":
      return { ...state, MobileMenu: !state.MobileMenu };
      case "closeMobileMenu":
        return { ...state, MobileMenu: false };
    case "toggleAccount":
      console.log("state123", state);
      return { ...state, Account: !state.Account };
      case "closeAccount":
        console.log("state123", state);
        return { ...state, Account: false };
    default:
      return state; // Always return the current state by default, not null
  }
};


export default MenuSearchReducer;
