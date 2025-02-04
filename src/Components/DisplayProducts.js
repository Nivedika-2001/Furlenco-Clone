import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { urlPath } from "../END_POINTS";
import "../CSS/DisplayProducts.css";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import EditProducts from "./EditProducts";

function Items({ currentItems, onDelete }) {
  const handleDelete = (id) => {
    deleteProduct(id);
  };
  const deleteProduct = (productId) => {
    let url = urlPath + `/search/deleteProduct/${productId}`;
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
          toast.success("Product deleted successfully", {
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
        toast.info("Product cannot be deleted", {
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
    <div className="divProducts">
      {currentItems.length > 0 && (
        <table border={1} className="tableProducts">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Available Stocks</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      className="displayImages"
                      src={item.productURL}
                      alt="images"
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productPrice}</td>
                  <td>{item.productType}</td>
                  <td>{item.availableStock}</td>
                  <td>
                  <EditProducts productName={item.productName}/>
                    <MdDelete
                      className="deleteProduct"
                      onClick={(event) => {
                        handleDelete(item.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function DisplayProducts() {
  const [productData, setProductData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    let url = urlPath + `/search/listAllProducts`;
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
          setProductData(response.data);
          getAllProducts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="paginate"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default DisplayProducts;
