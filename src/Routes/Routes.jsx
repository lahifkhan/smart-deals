import { createBrowserRouter } from "react-router";
import Layouts from "../Layouts/Layouts";
import Home from "../Pages/Home";
import AllProducts from "../Components/Products/AllProducts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import CreateProduct from "../Components/Products/CreateProduct";
import MyBids from "../Components/Bids/MyBids";
import MyProducts from "../Components/Products/MyProducts";
import LatestProducts from "../Components/Products/LatestProducts";
import ProductDetails from "../Components/Products/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },

      {
        path: "/logIn",
        Component: Login,
      },

      {
        path: "/register",
        Component: Register,
      },

      {
        path: "/createProduct",
        element: (
          <PrivateRoutes>
            <CreateProduct></CreateProduct>
          </PrivateRoutes>
        ),
      },

      {
        path: "/myBids",
        Component: MyBids,
      },

      {
        path: "/myProducts",
        Component: MyProducts,
      },

      {
        path: "/products/:id",
        element: (
          <PrivateRoutes>
            <ProductDetails></ProductDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
      },
    ],
  },
]);
