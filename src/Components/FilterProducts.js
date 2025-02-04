import React, { useContext, useEffect, useRef, useState } from "react";
import "../CSS/Home.css";
import "../CSS/Card.css";
import MyContext from "./Context";
import axios from "axios";
import m6 from "../Images/m6.jpg";
import { Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { urlPath } from "../END_POINTS";

const FilterProducts = ({ filterName }) => {
  const [itemID, setItemID] = useState();
  const [data1, setData1] = useState([]);
  const [checkCart, setCheckCart] = useState(false);
  const [checkWishlist, setCheckWishlist] = useState();
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
  const [clickedItemID, setClickedItemID] = useState(null);
  const [id, setID] = useState(1);
  const [listID, setlistID] = useState([]);

  const getQuantity = (productId) => {
    let url = urlPath + `/cart/quantity/${phoneNumber}/${productId}`;
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
          console.log("getData");
          setData1(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addToCartData = (productId) => {
    let url = urlPath + `/cart/add/${phoneNumber}/${productId}/${id}`;
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
          console.log(productId);
          listID.push(...listID, productId);
          console.log("listID", listID);
          getQuantity(productId);
          handleList(productId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleList = (productId) => {
    console.log(`data1:: ${listID.includes(productId)}`);
    if (listID.includes(productId)) {
      console.log("entered ....");
      setCheckCart(true);
      console.log(`data1:: ${listID}`);
      toast.info("Product is already in the cart", {
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
    } else {
      toast.success("Item added successfully", {
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
    }
  };
  const addToWishlist = (productId) => {
    let url = urlPath + `/wishlist/add/${phoneNumber}/${productId}`;
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
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(`repeat: addtocart`);
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
          console.log(`Quantity: ${response.data}`);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(`repeat: addtocart`);
      });
  };
  useEffect(() => {
    addToCartData();
  }, []);
  return (
    <>
      <div className="rentProduct">
        {filterName.length > 0 &&
          filterName.map((item, index) => {
            return (
              <div key={index} class="card cardDesign ">
                <div class="imgDiv">
                  <div>
                    <div className="heart">
                      {login ? (
                        clickedItemID === item.id && checkWishlist === 1 ? (
                          <MdFavorite
                            className="favoriteBorder"
                            onClick={() => {
                              deleteItemFromWishlist(item.id);
                              setClickedItemID(null);
                              toast.alert("Item removed from wishlist", {
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
                        ) : (
                          <MdFavoriteBorder
                            className="favoriteBorder"
                            onClick={() => {
                              addToWishlist(item.id);
                              setClickedItemID(item.id);
                              toast.success("Added item to wishlist", {
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
                        )
                      ) : (
                        <MdFavoriteBorder
                          className="favoriteBorder"
                          onClick={() => {
                            addToWishlist(item.id);
                            setClickedItemID(item.id);
                            toast.success("Added item to wishlist", {
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
                      )}
                    </div>
                    <img src={item.productURL} class="card-img-top" alt="img" />{" "}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title titleProduct">{item.productName}</h5>
                  <span className="rent">Buy</span>
                  <p class="card-text">₹{item.productPrice}</p>

                  <button
                    className="addTocartButton"
                    onClick={() => {
                      addToCartData(item.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FilterProducts;
