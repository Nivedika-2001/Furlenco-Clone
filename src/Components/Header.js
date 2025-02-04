import React, { useContext, useEffect, useState } from "react";
import "../CSS/Header.css";
import Logo1 from "../Images/Logo1.png";
import { BsCartDash } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiaSearchSolid } from "react-icons/lia";
import Login from "./Login";
import OTP from "./OTP";
import Combination from "./Combination";
import Details from "./Details";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import MyContext from "./Context";
import DeliveryLocation from "./DeliveryLocation";
import { urlPath } from "../END_POINTS";
import { useWishlist } from "./WishlistContext";
import { toast } from "react-toastify";

const label = window.LabelConfig;
const Header = () => {
  const [
    search,
    setSearch,
    data,
    setData,
    productID,
    setProductID,
    userName,
    setUserName,
    login,
    setLogin,
    phoneNumber,
    setPhoneNumber,
    role,
    setRole,
    productCategory,
    setProductCategory,
    discount,
    setDiscount,
  ] = useContext(MyContext);

  useEffect(() => {
    getSearchData();
  }, []);
  const {
    wishlistStatus,
    updateWishlistStatus,
    clearLocalStorageOnLogout,
    loadUserSpecificData,
  } = useWishlist();

  //function for SEARCH Functionality
  const getSearchData = () => {
    if (search === "") {
      setData([]);
    } else {
      let url = urlPath + `/search/fetch/${search}`;
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.status === 202) {
            console.log(response.data);
            setData(response.data);
          }
        })
        .catch((error) => {
          console.log("error");
          if (error.response.data.code === 1001) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <div class="row container-fluid header">
      <div className="col col-2">
        <Link to="/">
          <img className="Logo" src={Logo1} alt="Furlenco Logo" />
        </Link>
      </div>

      <div className="col col-1 displayFlex">
        <DeliveryLocation />
      </div>

      <div className="col col-1 headerText">
        <Link className="link" to="/bedroom">
          {label.header.buy}
        </Link>
      </div>

      <div className="col col-1 headerText">
        <Link className="link" to="/rent">
          {label.header.rent}
        </Link>
      </div>
      <div className="col col-1 headerText unlmtd">{label.header.unlmted}</div>
      <div className="col col-3 displayFlex">
        <div className="search">
          <div>
            <input
              className="inputHeader"
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder={label.header.searchPlaceholder}
            />
          </div>
          <div className="searchIcon">
            <Link to="/search">
              <LiaSearchSolid onClick={getSearchData} />
            </Link>
          </div>
        </div>
      </div>

      <div class="dropdown col col-1 icons">
        <FaUser
          class=" dropdown-toggle"
          id="dropdownMenuButton"
          aria-expanded="false"
          data-mdb-toggle="dropdown"
        />

        <ul
          className="dropdown-menu "
          id="dp-menu"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <Link class="dropdown-item dropHover dropNone" id="text">
              {label.header.helloUser}
              <br />
              {userName}
            </Link>
          </li>
          {login ? null : (
            <li>
              <p class="dropdown-item" id="text">
                <Combination />
              </p>
            </li>
          )}
          <hr className="hrLength" />
          {login && role === "ADMIN" ? (
            <li>
              <Link class="dropdown-item dropHover" to="/addProducts" id="text">
                {label.header.addProduct}
              </Link>
            </li>
          ) : null}
          {login && role === "USER" ? (
            <li>
              <Link class="dropdown-item dropHover" to="/order" id="text">
                My Orders
              </Link>
            </li>
          ) : null}
          {login && role === "ADMIN" ? (
            <li>
              <Link
                class="dropdown-item dropHover"
                to="/displayProducts"
                id="text"
              >
                {label.header.viewProducts}
              </Link>
            </li>
          ) : null}
          {login ? (
            <li>
              <Link class="dropdown-item dropHover" to="/wishlist" id="text">
                {label.header.wishlist}
              </Link>
            </li>
          ) : null}
          <li>
            <Link class="dropdown-item dropHover" to="#" id="text">
              {label.header.contactUs}
            </Link>
          </li>
          <li>
            <Link class="dropdown-item dropHover" to="/helpCenter" id="text">
              {label.header.helpCenter}
            </Link>
          </li>
          {login ? (
            <li>
              <Link
                class="dropdown-item dropHover"
                to="/"
                id="text"
                onClick={() => {
                  setLogin(false);
                  setUserName("User");
                  //clearLocalStorageOnLogout();
                }}
              >
                {label.header.logout}
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="col col-1 icons">
        <Link className="addToCartLink" to="/wishlist">
          <MdFavoriteBorder />
        </Link>
      </div>
      <div className="col col-1 icons">
        <Link className="addToCartLink" to="/add">
          <BsCartDash />
        </Link>
      </div>
    </div>
  );
};

export default Header;
