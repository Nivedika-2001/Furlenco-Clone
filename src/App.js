import "./App.css";
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ContextProviderr from "./Components/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from "./Components/ContextProvider";
import { WishlistProvider } from "./Components/WishlistContext";

const App = () => {
  return (
    <ContextProvider>
    <WishlistProvider>
        <div>
          <Header />
          <Outlet />
          <Footer />
          <ToastContainer />
        </div>
        </WishlistProvider>
      </ContextProvider>
  );
};

export default App;
