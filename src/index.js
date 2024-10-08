import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { RouterProvider } from "react-router-dom";
import router from "./routing/route";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
