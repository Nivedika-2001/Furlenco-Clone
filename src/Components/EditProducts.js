import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CiEdit } from "react-icons/ci";
import { urlPath } from "../END_POINTS";
import axios from "axios";
import { toast } from "react-toastify";
import "../CSS/EditProducts.css";

function EditProducts({ productName }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [stocks, setStocks] = useState("");
  const [price, setPrice] = useState("");
  const [errorMsg, setErrorMsg] = useState({});
  const [errorCSS, setErrorCSS] = useState(false);
  let productPriceValid = /^\d+(\.\d+)?$/;
  let productUrlValid =
    /^https?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]$/i;
  let stocksValid = /^[0-9]+$/;
  const handleCategoryChange = (event) => {
    setProductCategory(event.target.value);
  };

  const handleAddProduct = () => {
    let errors = {};

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
    }
  };
  const convertToCurrency = (price) => {
    const formattedPrice = parseFloat(price).toLocaleString("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setPrice(formattedPrice);
  };
  useEffect(() => {
    if (price !== "") {
      updateProducts();
    }
  }, [price]);
  const updateProducts = () => {
    const RequestBody = {
      productName: productName,
      productType: productCategory,
      productPrice: price,
      availableStock: parseInt(stocks),
      productURL: productUrl,
    };
    let url = urlPath + "/search/updateProduct";
    axios
      .put(url, RequestBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 202) {
          toast.success("Product updated successfully", {
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
        setProductUrl("");
        setProductPrice("");
        setProductCategory("");
        setStocks("");
        handleClose();
      })
      .catch((error) => {
        toast.info("Cannot update a product", {
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
    <>
      <CiEdit onClick={handleShow} className="editCi" />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                className="cursorChange"
                type="text"
                value={productName}
                placeholder="Enter Product Name"
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                value={productPrice}
                onChange={(event) => {
                  setProductPrice(event.target.value);
                }}
                placeholder="Enter Product Price"
                autoFocus
                required
              />
              <span className="errorAddProducts">{errorMsg.price}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={productCategory}
                onChange={handleCategoryChange}
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
              </Form.Select>
              <span className="errorAddProducts">{errorMsg.category}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Url</Form.Label>
              <Form.Control
                type="text"
                value={productUrl}
                onChange={(event) => {
                  setProductUrl(event.target.value);
                }}
                placeholder="Enter product image url"
                required
                autoFocus
              />
              <span className="errorAddProducts">{errorMsg.url}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Unit</Form.Label>
              <Form.Control
                className="stocksInput"
                type="number"
                placeholder="Enter no of units"
                value={stocks}
                onChange={(event) => {
                  setStocks(event.target.value);
                }}
                autoFocus
                required
              />
              <span className="errorAddProducts">
                {errorMsg.availableStocks}
              </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProducts;
