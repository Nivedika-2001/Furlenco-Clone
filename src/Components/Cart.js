import React, { useContext, useEffect, useRef, useState } from "react";
import cart from "../Images/cart4.png";
import MyContext from "./Context";
import axios from "axios";
import circle from "../Images/c.webp";
import "../CSS/Cart.css";

import { IoArrowForward } from "react-icons/io5";
import Item from "./Item";
import { urlPath } from "../END_POINTS";
import { toast } from "react-toastify";
import { useWishlist } from "./WishlistContext";
import { useNavigate } from "react-router-dom";
import Offers from "./Offers";
const Cart = () => {
  const [data1, setData1] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
  const [value, setValue] = useState();
  const [totalAmount, setTotalAmount] = useState();
  //convert double datatype price into string currency format
  const convertToCurrency = (price) => {
    price = price - (discount || 0);
    console.log(discount);
    console.log("discount", discount);
    setTotalAmount(
      price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })
    );
  };
  useEffect(() => {
    getuserData();
    getTotalPrice();
    console.log("discount", discount);
  }, [discount]);
  //Function to get Total Price of cart products
  const getTotalPrice = () => {
    let url = urlPath + `/cart/totalPrice/${phoneNumber}`;
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
          convertToCurrency(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //function to get all the cart items
  const getuserData = () => {
    let url = urlPath + `/cart/getAll/${phoneNumber}`;
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
  const {
    wishlistStatus,
    updateWishlistStatus,
    clearLocalStorageOnLogout,
    loadUserSpecificData,
  } = useWishlist();
  const addToCartData = (productId) => {
    let url = urlPath + `/cart/add/${phoneNumber}/${productId}/${1}`;
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
  const handleAddToCart = (productId) => {
    const existingItem = data1.find(
      (item) => item.products.productID === productId
    );

    if (existingItem) {
      const updatedData = data1.map((item) => {
        if (item.products.productID === productId) {
          item.quantity += 1;
        }
        return item;
      });
      setData1(updatedData);
    } else {
      addToCartData(productId);

      getuserData();
    }
  };
  const navigate = useNavigate();
  const goToOrderSummmary = () => {
    navigate("/orderSummary");
  };
  return (
    <>
      {data1.length > 0 && login ? (
        <div className="cartSide">
          <div className="cartProduct">
            <div className="cartDiv">
              <p className="cartP">Buy Cart {data1.length} items</p>
              {data1.map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    productId={item.products.productID}
                    phoneNo={phoneNumber}
                    getuserData={getuserData}
                    itemCount={item.quantity}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <Offers />
            <div className="total">
              <p className="cartTotal">
                <div className="totalPriceText">
                  <div>Buy Cart {data1.length} items</div>
                  <div>{totalAmount}</div>
                </div>
              </p>
              <button className="proceed" onClick={goToOrderSummmary}>
                <div> {totalAmount}</div>
                <div className="">
                  PROCEED
                  <IoArrowForward className="arrowCart" />
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cartEmpty">
          <h3 className="emptyCart">Your Cart Looks A little Empty! </h3>
          <p className="cartText">Start Buying or Renting with us</p>
          <img className="sadCart" src={cart} alt="empty cart" />
        </div>
      )}
    </>
  );
};

export default Cart;
