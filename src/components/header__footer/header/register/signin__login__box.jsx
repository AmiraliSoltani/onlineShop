import React, { Fragment, useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Login from "./Login/Login";

import "./../../../../css/signin__login__box.css";
import SignIn from "./Signin/SignIn.jsx"
import loginContext from "../../../contexts/loginContext";
import {removeAuthenticateToken} from "../../../../services/authenticate"


function SignIn__login__box() {

  const [className1] = ["regular"];
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const {loginState, loginDispatch}= useContext(loginContext)

  const toggleModal = ()=>{
    setShowLoginModal(!showLoginModal);
    setShowRegisterModal(!showRegisterModal)
  }

  const signoutUser=()=>{
    loginDispatch({type:"userLoggedOut"})
    removeAuthenticateToken()
    setShowLoginModal(false);
    setShowRegisterModal(false)
  }

  console.log("nnnnnnnnn",loginState)
      return (
        <div>
          <div className={`signin__login__box ${className1}`} >
            {!loginState.authenticated && (
              <Fragment>
                <Login toggleModal={toggleModal} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
                <SignIn toggleModal={toggleModal} showRegisterModal={showRegisterModal} setShowRegisterModal={setShowRegisterModal}/>
              </Fragment>
            )}
  
            {loginState.authenticated && (
              <div
                className="success__login__register"
                id="success__login__register"
              >
                <Dropdown>
                <Dropdown.Toggle
  variant="success"
  id="dropdown-basic"
  style={{
    direction: 'ltr',
    width: '159px', // Set the width to your desired size
    height: '40px', // Set the height to your desired size
    backgroundColor: "#00b894 !important",
    border: "0px",
  }}
>
  {loginState.user.name}
</Dropdown.Toggle>

  {className1==="regular" && 
                  <Dropdown.Menu >
                    <Dropdown.Item href="#/action-1">My Account</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">My Wish List</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">My orders</Dropdown.Item>
                    <Dropdown.Item onClick={signoutUser} >Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
    }
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      );
}

export default SignIn__login__box
  

// const mapStateToProps = (state) => ({
//   confirmlogin: state.authorization.isLoggedIn.confirmLogin,
//   memberName: state.authorization.isLoggedIn.name,
// });
// const mapDispatchToProps = (dispatch) => ({
//   loadAll: () => dispatch(loadAllProducts()),
//   logout: () => dispatch(loggedOut()),
//   loadAllProducts: () => dispatch(loadAllProducts()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(SigninLoginBox);
