import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../CSS/Offers.css";
import Sale from "../Images/sale.png";
import arrowRight from "../Images/s3.webp";
import cross from "../Images/c2.png";
import { toast } from "react-toastify";
import MyContext from "./Context";
function Offers() {
  const [show, setShow] = useState(false);
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
    console.log("sale", discount); // Log the updated discount value
  }, [discount]); // Run this effect whenever discount changes

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [coupon, setCoupon] = useState("");
  const [check, setCheck] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [save, setSave] = useState("");
  const handleCoupon = (code, amount, price) => {
    handleClose(true);
    setDiscount(price);
    console.log("sale", discount);
    setCheck(true);
    setSave(amount);
    setCodeValue(code);
    toast.success("Offer applied successfully", {
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
  };
  return (
    <>
      <button className="buttonSale" onClick={handleShow}>
        <div className="saleDiv">
          <div className="div1">
            <img className="saleImg" src={Sale} alt="Sale" />
            {check ? (
              <div>
                <h6 className="discountText">
                  {codeValue}
                  <span className="discountTextAvailable">Applied</span>
                </h6>
                <h6 className="saveText">{save}</h6>
              </div>
            ) : (
              <p className="pt-3">Offers & Discounts</p>
            )}
          </div>
          <div className="div2">
            {check ? (
              <p className="discountTextAvailable">Remove</p>
            ) : (
              <p className="discountTextAvailable">2 Available</p>
            )}
            {check ? (
              <img
                className="saleIcon"
                onClick={() => {
                  setCheck(false);
                  handleClose(true);
                  handleShow(true);
                  setDiscount(0);
                  setCodeValue("");
                  toast.success("Offer removed", {
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
                src={cross}
                alr="arrow right"
              />
            ) : (
              <img className="saleIcon" src={arrowRight} alr="arrow right" />
            )}
          </div>
        </div>
      </button>

      <Offcanvas show={show} onHide={handleClose} id="canvas" placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offers and Discounts</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="offerDiv">
            <input
              className="offersInput"
              type="text"
              value={coupon}
              onChange={(event) => {
                setCoupon(event.target.value);
              }}
              placeholder="Enter Coupon Code"
              required
            />
            <button className="offersButton"> APPLY</button>
          </div>
          <p className="offerP">Offers for you</p>
          <div className="offerBg offerBgMargin">
            <div className="designOffer">
              <img className="offerLogo" src={Sale} alt="Offer" />
              <div>
                <span className="offerTitlse">Get FLAT ₹1500 off</span>
                {codeValue === "FUR1500" ? (
                  <h6 className="saveText">Saved ₹1,500.00</h6>
                ) : (
                  ""
                )}
                <p className="offerDetails">
                  Apply this coupon to get FLAT ₹1500 off on your monthly rent
                  and chill. Great reason to...
                </p>
              </div>
            </div>
            <hr className="offerHorizontal" />
            <div className="offerDivApply">
              <div className="couponD">
                <span className="couponText">Coupon code : FUR1500</span>
              </div>
              {codeValue === "FUR1500" ? (
                <button
                  onClick={() => {
                    handleCoupon("FUR1500", "Saved ₹1,500.00", 1500);
                    setDiscount(1500);
                   
                  }}
                  className="applyCodeButton1"
                >
                  CODE APPLIED!
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleCoupon("FUR1500", "Saved ₹1,500.00", 1500);
                  }}
                  className="applyCodeButton"
                >
                  APPLY CODE
                </button>
              )}
            </div>
          </div>
          <div className="offerBg">
            <div className="designOffer">
              <img className="offerLogo" src={Sale} alt="Offer" />
              <div>
                <span className="offerTitlse">FLAT 25% off upto ₹1000</span>
                {codeValue === "FUR25" ? (
                  <h6 className="saveText">Saved ₹1,000.00</h6>
                ) : (
                  ""
                )}
                <p className="offerDetails">
                  Apply this coupon to get FLAT 25% off upto ₹1000 on your
                  monthly rent and chill. Great...
                </p>
              </div>
            </div>
            <hr className="offerHorizontal" />
            <div className="offerDivApply">
              <div className="couponD">
                <span className="couponText">Coupon code : FUR25</span>
              </div>
              {codeValue === "FUR25" ? (
                <button
                  onClick={() => {
                    handleCoupon("FUR25", "Saved ₹1,000.00", 1000);
                  }}
                  className="applyCodeButton1"
                >
                  CODE APPLIED!
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleCoupon("FUR25", "Saved ₹1,000.00", 1000);
                  }}
                  className="applyCodeButton"
                >
                  APPLY CODE
                </button>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Offers;
