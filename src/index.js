import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import Card from "./Components/Card";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Buy from "./Components/Buy";
import Rent from "./Components/Rent";
import Bedroom from "./Components/Bedroom";
import RentDisplay from "./Components/RentDisplay";
import DeliveryLocation from "./Components/DeliveryLocation";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import AddProducts from "./Components/AddProducts";
import DisplayProducts from "./Components/DisplayProducts";
import HelpCenter from "./Components/HelpCenter";
import HelpQuery from "./Components/HelpQuery";
import { WishlistProvider } from "./Components/WishlistContext";
import OrderSummary from "./Components/OrderSummary";
import Order from "./Components/Order";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Card />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/rent",
        element: <Rent />,
      },
      {
        path: "/bedroom",
        element: <Bedroom />,
      },
      {
        path: "/livingRoom",
        element: <RentDisplay />,
      },
      {
        path: "/delivery",
        element: <DeliveryLocation />,
      },
      {
        path: "/add",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/addProducts",
        element: <AddProducts />,
      },
      {
        path: "/displayProducts",
        element: <DisplayProducts />,
      },
      {
        path: "/helpCenter",
        element: <HelpCenter />,
      },
      {
        path: "/raiseQuery",
        element: <HelpQuery />,
      },
      {
        path: "/orderSummary",
        element: <OrderSummary />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    
      <RouterProvider router={appRoute}></RouterProvider>
    
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
