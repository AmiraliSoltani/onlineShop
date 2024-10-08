import React, { useContext, useEffect, useState } from "react";
import "./../../../../../css/Signin.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import loginContext from "../../../../contexts/loginContext";
import { ReadTokenInformation } from "../../../../../services/ReadTokenInformation";

const userService = require("../../../../../services/authenticate");

function SignIn({ showRegisterModal, setShowRegisterModal, toggleModal }) {
  const schema = z.object({
    username: z.string().email("Please enter a valid email address"),
    password: z.string().min(5, "Password needs at least 5 letters"),
    name: z.string().min(2, "Name needs at least 2 letters"),
    lastName: z.string().min(2, "Last name needs at least 2 letters"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const { loginState, loginDispatch } = useContext(loginContext);
  const [generalError, setGeneralError] = useState(false);
  const [getUserData, setGetUserData] = useState(false);

  if (getUserData) {
    ReadTokenInformation();
  }

  const onSubmit = async (data) => {
    const [authenticate, msg] = await userService.registerUser(data);
    if (authenticate) {
      setGetUserData(true);
      if (generalError) setGeneralError(false);
    } else setGeneralError(msg);
  };

  // Google sign-up handler
  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    const width = 700;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    // const url = 'http://localhost:8080/auth/google'; // Your backend Google OAuth URL
    const url = 'https://backend-register-online-shop-8ruek3xu5-amiralisoltanis-projects.vercel.app/auth/google'; // Your backend Google OAuth URL

    const features = `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`;

    window.open(url, "_blank", features);
  };

  // Listen for the token from the Google popup
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.token) {
        // Token received from the popup
        console.log("Token received: ", event.data.token);

        // Save the token to localStorage
        localStorage.setItem("access_token", event.data.token);

        // Optionally decode the token
        const decodedToken = jwtDecode(event.data.token);
        console.log("Decoded Token: ", decodedToken);

        // Close the modal
        setShowRegisterModal(false);

        // Set user state or perform other actions based on the received token
        setGetUserData(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <div className="signin" id="signin__button">
        <button onClick={() => setShowRegisterModal(true)} className="btn ">
          <span className="signin__1">Sign In</span>
          <span className="signin__2">Sign In</span>
          <span className="signin__hidden">Sign In</span>
        </button>
      </div>

      {/* Register Modal */}
      <Modal
        className="register__modal"
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        animation={1}

      >
        <div className="register" id="register__modal">
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          {!loginState.authenticated && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Modal.Body>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="col-sm-7">
                    {generalError && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded">
                        {generalError}
                      </div>
                    )}
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Enter your first name"
                      className="form-control mt-3 mb-3"
                      style={{ width: "90%" }}

                    />
                    {errors.name && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded width90 ">
                        {errors.name.message}
                      </div>
                    )}

                    <input
                      {...register("lastName")}
                      type="text"
                      placeholder="Enter your last name"
                      className="form-control mt-3 mb-3"
                      style={{ width: "90%" }}

                    />
                    {errors.lastName && (
                      <div 
                      className="w-90 bg-danger text-center text-warning p-2 mt-2 rounded width90 "
                     >
                        {errors.lastName.message}
                      </div>
                    )}

                    <input
                      {...register("username")}
                      type="email"
                      placeholder="Enter your email"
                      className="form-control mt-3 mb-3"
                      style={{ width: "90%" }}
                    />
                    {errors.username && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded width90 "
                     >

                        {errors.username.message}
                      </div>
                    )}

                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Enter your password"
                      className="form-control mt-3 mb-3"
                      style={{ width: "90%" }}
                    />
                    {errors.password && (
                      <div className="w-100 bg-danger text-center text-warning p-2 mt-2 rounded width90 "
                      >
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="col-sm-6">
                    <img
                      src={require('../../../../../assets/icons/sign-in-with-google-icon.png')}
                      alt="logo"
                      style={{
                        width: '214px',
                        height: '52px',
                        cursor: "pointer",
                      }}
                      onClick={handleGoogleSignUp} // Trigger Google sign-up
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="sign" style={{ backgroundColor: "#747d8c"}}>
                                <Button className="button"  type="submit" variant="primary">
                  Create An Account
                </Button>
                <Button
  className="button bg-dark"
  variant="secondary"
  onClick={() => setShowRegisterModal(false)}
  style={{ width: "150px" }}
>
  No Thanks
</Button>

              </Modal.Footer>
            </form>
          )}
          {loginState.authenticated && <div>Welcome back!</div>}
        </div>
      </Modal>
    </div>
  );
}

export default SignIn;



