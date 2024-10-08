import React, { useReducer } from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardsReducer from "./components/reducers/cardReducer";
import MenuSearchReducer from "./components/reducers/MenuSearchReducer";
import loginReducer from "./components/reducers/loginReducer";
import blurReducer from "./components/reducers/blurReducer";
import Footer from "./components/header__footer/footer";
import Header from "./components/header__footer/header";
import blurContext from "./components/contexts/blur";
import cardContext from "./components/contexts/blur";
import menuSearchContext from "./components/contexts/menuSearchContext";
import loginContext from "./components/contexts/loginContext";
import { Outlet } from "react-router-dom";

function App() {
  const initialCardState = {
    cartProducts:[],
    lastVisitedProducts:[],
    lastSearches:[],
   favoriteProducts:[],
  };
  const initialLoginState = {
    authenticated:false,
    user:{}
  };
  const initialMenuSearchState = {
    menu:false,
    search:false
  };
  const initialblurState = {
    blur:false,
  };
  const [cardState, cardDispatch] = useReducer(CardsReducer, initialCardState);
  const [menuSearchState, menuSearchDispatch] = useReducer(MenuSearchReducer, initialMenuSearchState);
  const [loginState, loginDispatch] = useReducer(loginReducer, initialLoginState);
  const [blurState, blurDispatch] = useReducer(blurReducer, initialblurState);


  return (
      <>
            <blurContext.Provider value={{ blurState, blurDispatch }}>
      <cardContext.Provider value={{ cardState, cardDispatch }}>
      <menuSearchContext.Provider value={{ menuSearchState, menuSearchDispatch }}>
        <loginContext.Provider value={{ loginState, loginDispatch }} >
        <Header />
        <Outlet/>
        <Footer />
        <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </loginContext.Provider>
      </menuSearchContext.Provider>
      </cardContext.Provider>
      </blurContext.Provider>

      </>
  )
}

export default App






// import { Link } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>hi , this is Amirali , just for test</p>
//         <Link to={"/user"}> user</Link>
//       </header>
//     </div>
//   );
// }

// export default App;
