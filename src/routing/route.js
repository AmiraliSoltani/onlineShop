import { createBrowserRouter } from "react-router-dom";
import HeaderFooter from "../components/header__footer";
import Main__page from "../components/main__page";
import Product from "../components/product";
import Category from "../components/category";
import Not__found from "../components/not__found";
import ShoppingProcess from "../components/shoppingProcess";
import LastCategory from "../components/last_category";
import AdvanceSearch from "../components/advanceSearch";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderFooter/>,
    children: [
      { path: "", element: <Main__page /> },
      { path: "product/:productId/", element: <Product /> },
      { path: "category/:categoryId/", element: <Category /> },
      { path: "shoppingProcess", element: <ShoppingProcess /> },
      {
        path: "lastCategory/:categoryId/:filters?",
        element: <LastCategory />,
      },
      {
        path: "search/:filters?",
        element: <AdvanceSearch />,
      },
      { path: "*", element: <Not__found /> },
    ],
  },
]);

export default router;
