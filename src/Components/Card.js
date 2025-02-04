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
import { useWishlist } from "./WishlistContext";

const Card = () => {
  const [itemID, setItemID] = useState();
  const [data1, setData1] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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
  const [clickedItemID, setClickedItemID] = useState(null);
  let id = 0;
  const [quantity, setQuantity] = useState(1);

  //function to add items to cart
  const addToCartData = (productId, currentQuantity) => {
    let url = urlPath + `/cart/add/${phoneNumber}/${productId}/${quantity}`;
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
          updateWishlistStatus({ ...wishlistStatus });
          toast.success("Item added successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              // Customize the toast container style
              //  backgroundColor: '#b9e3e6',
              // backgroundColor: '#dcf1f3',
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
      })
      .catch((error) => {
        console.log(error);
      });
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
          updateWishlistStatus((prevStatus) => ({
            ...prevStatus,
            [productId]: true,
          }));
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
          updateWishlistStatus(productId, false);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(`repeat: addtocart`);
      });
  };
  useEffect(() => {
    addToCartData();
    deleteItemFromWishlist();
    if (login) {
      let wishlistUrl = urlPath + `/wishlist/user/${phoneNumber}`;
      axios
        .get(wishlistUrl, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.status === 202) {
            const wishlistData = response.data.reduce((status, item) => {
              status[item.productId] = true;
              return status;
            }, {});
            updateWishlistStatus(wishlistData);
          }
        })
        .catch((error) => {
          console.log("Error fetching wishlist data");
        });
    }
  }, [search, login, phoneNumber]);

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
          setQuantity(response.data);
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
          console.log(wishlist);
          const wishlistData = response.data.reduce((status, item) => {
            status[item.products.productID] = true;
            return status;
          }, {});

          updateWishlistStatus(wishlistData);
          console.log("ggg", wishlistStatus);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const handleAddToCart = (productId) => {
    const existingItem = data1.find(
      (item) => item.products.productID === productId
    );

    if (existingItem) {
      // If the product already exists in the cart, update its quantity
      const updatedData = data1.map((item) => {
        if (item.products.productID === productId) {
          item.quantity += 1;
        }
        return item;
      });
      setData1(updatedData);
    } else {
      addToCartData(productId);
      // If the product is not in the cart, add it with quantity 1
      // You can call the endpoint to add the product to the cart here
      // For example, axios.post(urlPath + '/cart/add', { productId, phoneNumber });
      //getuserData(); // Refresh the cart data after adding the new item
    }
  };
  return (
    <>
      <div className="rentProduct">
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div key={index} class="card cardDesign ">
                <div class="imgDiv">
                  <div>
                    <div className="heart">
                      {login ? (
                        wishlistStatus[item.id] ? (
                          <MdFavorite
                            className="favoriteBorder"
                            onClick={() => {
                              deleteItemFromWishlist(item.id);
                              updateWishlistStatus(item.id, false);
                              toast.info("Item removed from wishlist", {
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
                              updateWishlistStatus(item.id, true);
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
                    onClick={async () => {
                      console.log(item.id);
                      const currentQuantity = await getQuantity(item.id);
                      console.log(`...quantity : ${currentQuantity}`);
                      setQuantity(currentQuantity);
                      addToCartData(item.id, currentQuantity);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="noResult">
            <img className="glass" src={m6} alt="No Item Found" />
            <p className="noH">Something looks fishy!</p>
            <p className="searched">
              What you searched was unfortunately <br /> not found or doesn't
              exist
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
