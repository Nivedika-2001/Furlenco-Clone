import React, { useContext, useEffect } from "react";
import b1 from "../Images/buy1.webp";
import b2 from "../Images/buy2.webp";
import b3 from "../Images/buy3.webp";
import b4 from "../Images/buy4.webp";
import b5 from "../Images/buy5.webp";
import b6 from "../Images/buy6.webp";
import b7 from "../Images/buy7.webp";
import "../CSS/Buy.css";
import { Link } from "react-router-dom";
import MyContext from "./Context";
import Bedroom from "./Bedroom";
const label = window.LabelConfig;
const Buy = () => {
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
  useEffect(() => {}, [productCategory]);

  const handleCategoryChange = (newCategory) => {
    console.log("Category:", newCategory);
    setProductCategory(newCategory);
    console.log("Category:", productCategory);
  };
  console.log("Updated Category:", productCategory);

  return (
    <div>
      <h3 className="buyTitle">{label.Buy.title}</h3>
      <div className="buyProducts">
        <Link
          to={{ pathname: "/bedroom", state: { category: "Living Room" } }}
          className="removeDecoration"
        >
          <div
            className="clickBuy"
            onClick={() => {
              handleCategoryChange("Living Room");
            }}
          >
            <img className="buyImages" src={b1} alt="b1" />
            <p className="buyText">Living Room</p>
          </div>
        </Link>
        <Link to="/bedroom" className="removeDecoration">
          <div
            className="clickBuy"
            onClick={() => {
              handleCategoryChange("Bedroom");
            }}
          >
            <img className="buyImages" src={b2} alt="b2" />
            <p className="buyText">Bedroom</p>
          </div>
        </Link>
        <Link
          to="/bedroom"
          className="removeDecoration"
          onClick={() => {
            handleCategoryChange("Storage");
          }}
        >
          <div className="clickBuy">
            <img className="buyImages" src={b3} alt="b3" />
            <p className="buyText">Storage</p>
          </div>
        </Link>
        <Link
          to="/bedroom"
          className="removeDecoration"
          onClick={() => {
            handleCategoryChange("Study");
          }}
        >
          <div className="clickBuy">
            <img className="buyImages" src={b4} alt="b4" />
            <p className="buyText">Study</p>
          </div>
        </Link>
        <Link
          to="/bedroom"
          className="removeDecoration"
          onClick={() => {
            handleCategoryChange("Dining");
          }}
        >
          <div className="clickBuy">
            <img className="buyImages" src={b5} alt="b5" />
            <p className="buyText">Dining</p>
          </div>
        </Link>
        <Link
          to="/bedroom"
          className="removeDecoration"
          onClick={() => {
            handleCategoryChange("Tables");
          }}
        >
          <div className="clickBuy">
            <img className="buyImages" src={b6} alt="b6" />
            <p className="buyText">Tables</p>
          </div>
        </Link>
        <Link
          to="/bedroom"
          className="removeDecoration"
          onClick={() => {
            handleCategoryChange("Chairs");
          }}
        >
          <div className="clickBuy">
            <img className="buyImages" src={b7} alt="b7" />
            <p className="buyText">Chairs</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Buy;
