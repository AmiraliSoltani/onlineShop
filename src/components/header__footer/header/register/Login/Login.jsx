import React, { useContext, useState, useEffect, useRef, Fragment } from "react";
import "./../../../../../css/Login.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginContext from "../../../../contexts/loginContext";
import { jwtDecode } from "jwt-decode";
import { ReadTokenInformation } from "../../../../../services/ReadTokenInformation";
import debounce from "lodash.debounce";
import { useDebouncedCallback } from 'use-debounce';
import menuSearchContext from "../../../../contexts/menuSearchContext";
import Signin from "../Signin/Signin";
import Spinner from "react-bootstrap/Spinner";
import blurContext from "../../../../contexts/blur";

const userService = require("../../../../../services/authenticate");

function Login({ showLoginModal, setShowLoginModal, toggleModal }) {
  const schema = z.object({
    username: z.string().email("Please enter a valid email address"),
    password: z.string().min(5, "Password needs at least 5 letters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  const { loginState, loginDispatch } = useContext(loginContext);
  const [generalError, setGeneralError] = useState(false);
  const [getUserData, setGetUserData] = useState(false);
  const { menuSearchState, menuSearchDispatch } = useContext(menuSearchContext);
  const [activeTab, setActiveTab] = useState(0);
  const {blurState,blurDispatch}=useContext(blurContext)

  const hasOpened = useRef(false); // Track if modal has opened

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (loginState.modalLogin) {
      if (!showLoginModal) {
        setShowLoginModal(!showLoginModal); // Only set the modal if it's not already showing
      }
      }
    loginDispatch({ type: "closeLogin" });
  }, [loginState.modalLogin]);


  

  useEffect(() => {
    // console.log("menuSearchState",menuSearchState.Account)
    if (menuSearchState.Account) {
      setIsVisible(true)
      // blurDispatch({ type: "activeBlur" });
      document.body.style.overflow = 'hidden';  // Disable scroll

    }
    else {
      document.body.style.overflow = 'auto';  // Disable scroll
      setIsVisible(false)
    } 
  }, [menuSearchState.Account]);


  if (getUserData) {
    ReadTokenInformation();
  }

  const onSubmit = async (data) => {
    setLoading(true);  // Start loading
    const [authenticate, user] = await userService.authenticateUser(data);

    if (authenticate) {
      setGetUserData(true);
      if (generalError) setGeneralError(false);
    } else setGeneralError(user);
    setLoading(false);  // Stop loading after the request completes

  };

  // Open Google popup for login
  const openPopup = (e) => {
    e.preventDefault();
    const width = 700;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const url = "https://backend-register-online-shop.vercel.app/auth/google";
    const features = `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`;

    window.open(url, "_blank", features);
  };

  // Listen for message event to capture the token from the popup
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.token) {
        console.log("Token received: ", event.data.token);

        // Save the token to localStorage
        localStorage.setItem("access_token", event.data.token);

        // Optionally decode the token
        const decodedToken = jwtDecode(event.data.token);
        console.log("Decoded Token: ", decodedToken);

        // Close the modal
        setShowLoginModal(false);

        // Set user state or perform other actions based on the received token
        setGetUserData(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);


  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="login_mobile">
          {/* <div className="header-mobile">Log In</div>  */}
         <form onSubmit={handleSubmit(onSubmit)}>
             <div className="d-flex flex-row justify-content-between align-items-center">
               <div className="w-100">
                 {generalError && (
                   <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">
                     {generalError}
                   </div>
                 )}

                 <input
                   {...register("username")}
                   type="text"
                   placeholder="enter your username"
                   className="form-control mt-3 mb-3 "
                 />
                 {errors.username && (
                   <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded ">
                     {errors.username.message}
                   </div>
                 )}

                 <input
                   {...register("password")}
                   type="password"
                   placeholder="enter your password"
                   className="form-control mt-3 mb-3 "
                 />
                 {errors.password && (
                   <div className="w-100 bg-danger text-center text-warning p-2 mt-2 mb-3 rounded">
                     {errors.password.message}
                   </div>
                 )}
               </div>
               </div>

               {/* <div className="">
                 <img
                   src={require("../../../../../assets/icons/log-in-with-google-icon.png")}
                   alt="logo"
                   style={{
                     width: "210px",
                     height: "43px",
                     cursor: "pointer",
                   }}
                   onClick={openPopup}
                 />
               </div> */}
               <div className="footerMenu-register">
           <button className="button-menu-register"  type="submit" >
               Log In
             </button>

             </div>
         </form>
       </div>
        )
      case 1:
        return <div className="tab-content">
           
          <Signin tab={true}></Signin>
          </div>;
      case 2:
        return <div className="tab-content">
            <img
                      src={require("../../../../../assets/icons/sign-in-with-google-icon.jpg")}
                      alt="logo"
                      style={{
                        width: "222px",
                        height: "54px",
                        cursor: "pointer",
                      }}
                      onClick={openPopup}
                    />
        
        </div>;
      default:
        return null;
    }
  };

  const closeSlidingPage=()=>{
    menuSearchDispatch({ type: "closeAccount" });
  }
  return (
    <Fragment>
            <div className={`account-menu-register container-special ${isVisible ? "visible-account" : ""} ` }>
            {!loginState.authenticated && (
              <Fragment>

                    <div className="tab-header-container-register">
      <div className="register-header">
      <img src={require("./../../../../../assets/icons/close.png")} alt="" className="close"  onClick={()=> menuSearchDispatch({ type: "toggleAccount" })} />

        <h2>Welcome</h2> {/* Title */}
      </div>

      <div className="register-tabs">
        <button
          className={`register-tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Log In
        </button>
        <button
          className={`register-tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Sign In
        </button>
        <button
          className={`register-tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={openPopup}
        >
          Google
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content-container">
        {renderTabContent()}
      </div>
    </div>

   
          </Fragment>

        )}
            </div>





      <div className="login" id="login__button">
        <button className="btn" onClick={() => setShowLoginModal(true)}>
          <span className="login__1">Log In</span>
          <span className="login__2">Log In</span>
          <span className="login__hidden">Log In</span>
        </button>
      </div>

      <Modal
        className="login__modal"
        key="loginModal"
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        animation={true}
      >
        {!loginState.authenticated && (
          <div className="login" id="login__modal">
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="col-sm-7">
                    {generalError && (
                      <div className="width90 bg-danger text-center text-warning p-2 mt-2 rounded">
                        {generalError}
                      </div>
                    )}

                    <input
                      {...register("username")}
                      type="text"
                      placeholder="enter your username"
                      className="form-control mt-3 mb-3 width90"
                    />
                    {errors.username && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded width90">
                        {errors.username.message}
                      </div>
                    )}

                    <input
                      {...register("password")}
                      type="password"
                      placeholder="enter your password"
                      className="form-control mt-3 mb-3 width90 "
                    />
                    {errors.password && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded width90">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="col-sm-6">
                    <img
                      src={require("../../../../../assets/icons/log-in-with-google-icon.png")}
                      alt="logo"
                      style={{
                        width: "210px",
                        height: "43px",
                        cursor: "pointer",
                      }}
                      onClick={openPopup}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="log" style={{ backgroundColor: "#747d8c"}}>
              <Button className="button" type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Log In"
            )}
          </Button>

                <Button className="button" variant="secondary" onClick={() => toggleModal()}  style={{ width: "200px" }}>
                Create An Account
                </Button>

              </Modal.Footer>
            </form>
          </div>
        )}

        {/* {loginState.authenticated && (
          <div className="success__login" id="success__login">
            <Modal.Header closeButton onClick={() => setShowLoginModal(false)}>
              <Modal.Title>Logged In Successfully</Modal.Title>
            </Modal.Header>
            <form onSubmit={() => {}}>
              <Modal.Body>
                <div className="name">Welcome back</div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => setShowLoginModal(false)}
                >
                  Continue
                </Button>
              </Modal.Footer>
            </form>
          </div>
        )} */}
      </Modal>
      </Fragment>
  );
}

export default Login;

