import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HeaderFooter from "../components/header__footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderFooter />,
    children: [
      { path: "", element: <App /> },
      { path: "user", element: <App /> },
    ],
  },
]);

export default router;
