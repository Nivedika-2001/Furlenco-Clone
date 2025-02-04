import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../CSS/AddProducts.css";
import { urlPath } from "../END_POINTS";
const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [stocks, setStocks] = useState("");
  const [price, setPrice] = useState();
  const [errorMsg, setErrorMsg] = useState({});
  const [errorCSS, setErrorCSS] = useState(false);
  let productNameValid = /^[a-zA-Z0-9\s]+$/;
  let productPriceValid = /^\d+(\.\d+)?$/;
  let productUrlValid =
    /^https?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]$/i;
  let stocksValid = /^[0-9]+$/;
  const handleCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };

  const handleAddProduct = () => {
    let errors = {};

    if (productName === "" || !productNameValid.test(productName)) {
      setErrorCSS(true);
      errors = {
        ...errors,
        name: productName === "" ? "Required" : "Invalid Product Name",
      };
    }

    if (productCategory === "") {
      setErrorCSS(true);
      errors = {
        ...errors,
        category: productCategory === "" && "Required",
      };
    }

    if (productPrice === "" || !productPriceValid.test(productPrice)) {
      setErrorCSS(true);
      errors = {
        ...errors,
        price: productPrice === "" ? "Required" : "Invalid Product Price",
      };
    }

    if (productUrl === "" || !productUrlValid.test(productUrl)) {
      setErrorCSS(true);
      errors = {
        ...errors,
        url: productUrl === "" ? "Required" : "Invalid Product Url",
      };
    }

    if (
      stocks === "" ||
      parseInt(stocks, 10) <= 0 ||
      !stocksValid.test(stocks)
    ) {
      setErrorCSS(true);
      errors = {
        ...errors,
        availableStocks:
          stocks === "" ? "Required" : "Units cannot be negative",
      };
    }

    setErrorMsg(errors);
    if (Object.values(errors).every((msg) => msg === "")) {
      setErrorCSS(false);
      convertToCurrency(productPrice);
      addProducts();
    }
  };

  // const convertToCurrency = (price) => {
  //   const formattedPrice = parseFloat(price).toLocaleString("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //   });
  //   setPrice(formattedPrice);
  //   console.log(`proc: ${formattedPrice}`);
  // };
  const convertToCurrency = (price) => {
    const formattedPrice = parseFloat(price).toLocaleString("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setPrice(formattedPrice);
    console.log(`proc: ${formattedPrice}`);
  };

  const addProducts = () => {
    const RequestBody = {
      productName: productName,
      productType: productCategory,
      productPrice: price,
      availableStock: parseInt(stocks),
      productURL: productUrl,
    };
    let url = urlPath + "/search/addProduct";
    axios
      .post(url, RequestBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 202) {
          toast.success("Product added successfully", {
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
          setProductName("");
          setProductUrl("");
          setProductPrice("");
          setProductCategory("");
          setStocks("");
        }
      })
      .catch((error) => {
        toast.info("Cannot add a product", {
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
      });
  };
  return (
    <div className="addProducts">
      <h3 className="productInfo">Product Information</h3>
      <div className="productsContainer">
        <label className="productLabel">Product Name</label>
        <input
          className={errorCSS ? "inputLabelError" : "inputLabel"}
          type="text"
          value={productName}
          onChange={(event) => {
            setProductName(event.target.value);
          }}
          placeholder="Enter product name"
          required
        />
        <span className="errorAddProducts">{errorMsg.name}</span>
        <label className="productLabel">Product Price</label>
        <input
          value={productPrice}
          className={errorCSS ? "inputLabelError" : "inputLabel"}
          type="text"
          onChange={(event) => {
            setProductPrice(event.target.value);
          }}
          placeholder="Enter product price"
          required
        />
        <span className="errorAddProducts">{errorMsg.price}</span>

        <label className="productLabel">Product Url</label>
        <input
          className={errorCSS ? "inputLabelError" : "inputLabel"}
          type="text"
          value={productUrl}
          onChange={(event) => {
            setProductUrl(event.target.value);
          }}
          placeholder="Enter product image url"
          required
        />
        <span className="errorAddProducts">{errorMsg.url}</span>

        <label className="productLabel">Product Category</label>
        <select
          name="category"
          id="category"
          className={errorCSS ? "inputLabelError" : "inputLabel"}
          value={productCategory}
          onChange={handleCategoryChange}
          required
        >
          <option value="" selected disabled hidden>
            Category
          </option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Storage">Storage</option>
          <option value="Study">Study</option>
          <option value="Dining">Dining</option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
        </select>
        <span className="errorAddProducts">{errorMsg.category}</span>
        <label className="productLabel">Product Unit</label>
        <input
          className={errorCSS ? "inputLabelError" : "inputLabel"}
          type="number"
          value={stocks}
          onChange={(event) => {
            setStocks(event.target.value);
          }}
          placeholder="Enter no of units"
          required
        />
        <span className="errorAddProducts">{errorMsg.availableStocks}</span>
        <button className="buttonProducts" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
