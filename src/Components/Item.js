import React, { useContext, useEffect, useRef, useState } from "react";
import "../CSS/Cart.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import MyContext from "./Context";
import { toast } from "react-toastify";
import { urlPath } from "../END_POINTS";
const Item = (props) => {
  let { item, productId, phoneNo, getuserData, itemCount } = props;
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
  const [itemC, setItemC] = useState(itemCount);
  console.log(`itemCount:${itemCount + 1}`);
  useEffect(() => {
    addToCartData();
  }, [itemC]);

  //function to add the item in the cart
  const addToCartData = () => {
    let url = urlPath + `/cart/add/${phoneNo}/${productId}/${itemC}`;
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
          console.log(`Quantity: ${response.data}`);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(`repeat: addtocart`);
      });
  };
  //function to delete item in the cart
  const deleteCartItem = () => {
    let url = urlPath + `/cart/deleteItem/${phoneNo}/${productId}`;
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
        }
      })
      .catch((error) => {
        console.log("error delete");
      });
  };
  return (
    <div className="cartDisplayFlex">
      <div>
        <img src={item.products.productURL} class="cartPic" alt="img" />
      </div>

      <div>
        <span className="productText">{item.products.productName}</span>
        <RiDeleteBin6Line
          className="deleteIcon"
          onClick={() => {
            deleteCartItem();
            getuserData();
            toast.success("Item removed from cart", {
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
        <p className="productText">₹{item.products.productPrice}</p>
        <button className="cartQuantity">
          <FaMinus
            className="cartIcons"
            onClick={(event) => {
              if (itemC <= 1) {
                deleteCartItem();
                toast.success("Item updated successfully", {
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
                addToCartData();
                toast.success("Item updated successfully", {
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
                setItemC(itemC - 1);
              }
            }}
          />
          {itemC}
          <FaPlus
            className="cartIcons"
            onClick={(event) => {
              addToCartData();
              toast.success("Item updated successfully", {
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
              });
              setItemC(itemC + 1);
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Item;
