import React, { useContext, useEffect, useState } from "react";
import "../CSS/Buy.css";
import { FaCheck } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import FilterProducts from "./FilterProducts";
import axios from "axios";
import { urlPath } from "../END_POINTS";
import MyContext from "./Context";
const Bedroom = () => {
  const [filterName, setFilterName] = useState([]);
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

  const location = useLocation();
  console.log("Location State:", location.state);
  const category = location.state?.category || "Default Category";
  console.log("...121212", category);

  const [type, setType] = useState("Living Room");

  useEffect(() => {
    handleProducts(type);
  }, [type]);
  const getProductsNameInASC = () => {
    let url = urlPath + `/search/filterProductsNameInASC/${type}`;
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
          setFilterName(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsNameInDESC = () => {
    let url = urlPath + `/search/filterProductsNameInDESC/${type}`;
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
          setFilterName(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsPriceInASC = () => {
    let url = urlPath + `/search/filterProductsPriceInASC/${type}`;
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
          setFilterName(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsPriceInDESC = () => {
    let url = urlPath + `/search/filterProductsPriceInDESC/${type}`;
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
          setFilterName(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProductsByCategory = (selectedCategory) => {
    let url = urlPath + `/search/getProductsByCategory/${selectedCategory}`;
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
          setType(selectedCategory);
          console.log(response.data);
          setFilterName(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleProducts = (selectedCategory) => {
    setType(selectedCategory);
    getProductsByCategory(selectedCategory);
  };
  return (
    <>
      <div className="filterBy">
        {console.log("CAT>>>>>>", productCategory)}
        <button
          className={type === "Living Room" ? "categoryButton" : "buyButton"}
          onClick={() => {
            // setCategory("Living Room");
            handleProducts("Living Room");
          }}
        >
          Living Room
        </button>
        <button
          className={type === "Bedroom" ? "categoryButton" : "buyButton"}
          onClick={() => {
            //setType("Bedroom");
            handleProducts("Bedroom");
          }}
        >
          Bedroom
        </button>
        <button
          className={type === "Storage" ? "categoryButton" : "buyButton"}
          onClick={() => {
            //setCategory("Storage");
            handleProducts("Storage");
          }}
        >
          Storage
        </button>
        <button
          className={type === "Study" ? "categoryButton" : "buyButton"}
          onClick={() => {
            // setCategory("Study");
            handleProducts("Study");
          }}
        >
          Study
        </button>
        <button
          className={type === "Dining" ? "categoryButton" : "buyButton"}
          onClick={() => {
            // setCategory("Dining");
            handleProducts("Dining");
          }}
        >
          Dining
        </button>
        <button
          className={type === "Tables" ? "categoryButton" : "buyButton"}
          onClick={() => {
            // setCategory("Tables");
            handleProducts("Tables");
          }}
        >
          Tables
        </button>
        <button
          className={type === "Chairs" ? "categoryButton" : "buyButton"}
          onClick={() => {
            // setCategory("Chairs");
            handleProducts("Chairs");
          }}
        >
          Chairs
        </button>
        <div className="filter">
          <p className="sortBy">SORT BY</p>
          <div class="dropdown col col-1 icons">
            <button
              className="buttonStyle"
              aria-expanded="false"
              data-mdb-toggle="dropdown"
            >
              <div className="check">
                Featured <FaCheck className="checkIcon" />
              </div>
            </button>
            <ul
              className="dropdown-menu"
              id="feature-menu"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <Link
                  class="dropdown-item dropHover bgColor"
                  to="/bedroom"
                  id="textStyle"
                  onClick={getProductsNameInASC}
                >
                  Name A-Z
                </Link>
              </li>
              <hr className="hrTag" />
              <li>
                <Link
                  class="dropdown-item dropHover bgColor"
                  to="/bedroom"
                  id="textStyle"
                  onClick={getProductsNameInDESC}
                >
                  Name Z-A
                </Link>
              </li>

              <hr className="hrTag" />

              <li>
                <Link
                  class="dropdown-item dropHover bgColor"
                  to="/bedroom"
                  id="textStyle"
                  onClick={getProductsPriceInASC}
                >
                  Price - Low to High
                </Link>
              </li>
              <hr className="hrTag" />

              <li>
                <Link
                  class="dropdown-item dropHover bgColor"
                  to="/bedroom"
                  id="textStyle"
                  onClick={getProductsPriceInDESC}
                >
                  Price - High to Low
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FilterProducts filterName={filterName} />
    </>
  );
};

export default Bedroom;
