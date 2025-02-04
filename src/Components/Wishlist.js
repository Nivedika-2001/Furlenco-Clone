import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import m6 from "../Images/m6.jpg";
import MyContext from "./Context";
import "../CSS/Wishlist.css";
import wishList from "../Images/wishlist.png";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { urlPath } from "../END_POINTS";
import { useWishlist } from "./WishlistContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [clickStatus, setClickStatus] = useState(false);
  const [icon, setIcon] = useState(false);
  const {
    wishlistStatus,
    updateWishlistStatus,
    clearLocalStorageOnLogout,
    loadUserSpecificData,
  } = useWishlist();
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
    getWishlistData();
  }, [wishlist]);
  const addToCartData = (productId) => {
    let url = urlPath + `/cart/add/${phoneNumber}/${productId}/1`;
    axios
      .post(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 202) {
          console.log(`data: ${response.data}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getWishlistData = () => {
    let url = urlPath + `/wishlist/list/${phoneNumber}`;
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
          setWishlist(response.data);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const deleteItemFromWishlist = (productId) => {
    let url = urlPath + `/wishlist/delete/${phoneNumber}/${productId}`;
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 202) {
          console.log("deleted");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(`repeat: addtocart`);
      });
  };

  return (
    <>
      <div className="rentProduct">
        {login && wishlist.length > 0 ? (
          wishlist.map((item) => {
            return (
              <div class="card cardDesign ">
                <div class="imgDiv">
                  <div>
                    <div className="heart">
                      <MdFavorite className="heartIcon" />
                    </div>
                    <img
                      src={item.products.productURL}
                      class="card-img-top productsImages"
                      alt="img"
                    />
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title titleProduct">
                    {item.products.productName}
                  </h5>
                  <span className="rent">Buy</span>
                  <p class="card-text">₹{item.products.productPrice}</p>
                  <div className="addToCartDisplay">
                    <button
                      className="addTocartButton"
                      onClick={() => {
                        addToCartData(item.products.productID);
                      }}
                    >
                      Add to Cart
                    </button>
                    <RiDeleteBinLine
                      className="riDeleteBinLine"
                      size={25}
                      onClick={() => {
                        updateWishlistStatus(item.products.productID, false);
                        deleteItemFromWishlist(item.products.productID);
                        toast.success("Item removed from wishlist", {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          style: {
                            backgroundColor: "#bde5e8",
                            color: "#000",
                            border: "none",
                            borderRadius: "15px",
                            fontFamily: "Work Sans, sans-serif",
                            fontWeight: "600",
                          },
                          progressStyle: {
                            backgroundColor: "white",
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="noResult">
            <img className="emptyWishlist" src={wishList} alt="Wishlist" />
            <p className="shortlist">
              Explore more and shortlist items to save in your wishlist
            </p>
            <Link to="/">
              <button className="wishlistEmpty"> START SHOPPING</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
