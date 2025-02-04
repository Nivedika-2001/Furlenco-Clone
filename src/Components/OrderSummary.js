import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyContext from "./Context";
import { urlPath } from "../END_POINTS";
import "../CSS/Cart.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Offers from "./Offers";
import { GoPlus } from "react-icons/go";
import ShippingAddress from "./ShippingAddress";
import PaymentOptions from "./PaymentOptions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const [selectedOption, setSelectedOption] = useState(null);
 const navigate =useNavigate();
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const [addressCheck, setAddressCheck] = useState(false);
  const [paymentCheck, setPaymentCheck] = useState(false);
  const [order, setOrder] = useState([]);
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
    getuserData();
  }, []);
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
          setOrder(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="orderDivD">
        <div>
          <h3 className="orderTitle">Summary Order</h3>
          <div className="cartDisplayFlex cartAdjust">
            <div>
              {order.map((item) => {
                return (
                  <div className="checkout">
                    <div>
                      <img
                        src={item.products.productURL}
                        className="orderPicImg"
                        alt="img"
                      />
                    </div>
                    <div className="orderDivDesign">
                      <span className="orderText colorOrderText">
                        {item.products.productName}
                      </span>
                      <span className="orderText">
                        ₹{item.products.productPrice}
                      </span>
                      <span className="orderText">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="shippingDiv">
            <h3 className="orderTitle">Shipping Address</h3>
            <ShippingAddress
              addressCheck={addressCheck}
              setAddressCheck={setAddressCheck}
            />
          </div>
        </div>
        <div>
          <h3 className="orderTitle">Choose Payment Method</h3>
          <PaymentOptions
            paymentCheck={paymentCheck}
            setPaymentCheck={setPaymentCheck}
          />
          <button
            className="buttonAddress paddingPay"
            onClick={() => {
              if (addressCheck && paymentCheck) {
                Swal.fire({
                  icon: "success",
                  title: "Payment Successful",
                  text: "Thank you for your purchase. Your payment has been successfully processed.",
                  confirmButtonColor: "#069baa",
                  confirmButtonText: "Close",
                });
                navigate("/");
              } else {
                if (!addressCheck) {
                  toast.error("Please select an address before proceeding.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: {
                      backgroundColor: "#fff",
                      color: "red",
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
                  toast.error(
                    "Please select a payment option before proceeding.",
                    {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      style: {
                        backgroundColor: "#fff",
                        color: "red",
                        border: "none",
                        borderRadius: "15px",
                        fontFamily: "Work Sans, sans-serif",
                        fontWeight: "600",
                      },
                      progressStyle: {
                        backgroundColor: "white",
                      },
                    }
                  );
                }
              }
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
