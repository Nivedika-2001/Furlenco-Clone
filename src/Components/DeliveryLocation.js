import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import d1 from "../Images/d1.webp";
import d2 from "../Images/d2.webp";
import d3 from "../Images/d3.png";
import d4 from "../Images/d4.webp";
import d5 from "../Images/d5.webp";
import d6 from "../Images/d6.webp";
import d7 from "../Images/d7.png";
import d8 from "../Images/d8.webp";
import d9 from "../Images/d9.webp";
import d10 from "../Images/d10.webp";
import d11 from "../Images/d11.webp";
import d12 from "../Images/d12.webp";
import d13 from "../Images/d13.webp";
import d14 from "../Images/d14.webp";
import d15 from "../Images/d15.webp";
import "../CSS/DeliveryLocation.css";
import { FaArrowRight } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { TiLocation } from "react-icons/ti";
import axios from "axios";
const label = window.LabelConfig;
const DeliveryLocation = () => {
  localStorage.setItem("pincode",560068);
  const [pincode, setPincode] = useState(localStorage.getItem("pincode"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pincodeError, setPincodeError] = useState("");
  const pincodeValidate = /^[0-9]{6}$/;
  const [colorPincode, setColorPincode] = useState(false);
  const [city, setCity] = useState();
  const [pincodeInput, setPincodeInput] = useState(pincode);
  const handlePincode = (event) => {
    setPincode(event.target.value);
  };
  const citiesList = [
    "Bengaluru",
    "Mumbai",
    "Pune",
    "Delhi",
    "Gurugram",
    "Noida",
    "Hyderabad",
    "Chennai",
    "Ghaziabad",
    "Faridabad",
    "Jaipur",
    "Mysore",
    "Chandigarh",
    "Vijayawada",
    "Nashik",
  ];
  const handleClick = () => {
    // Pincode is not serviceable
    if (!pincodeValidate.test(pincode)) {
      console.log("Hi hello mmmmm");
      setPincodeError(label.deliveryLocation.invalidPincodeError);
      setPincode("");
      setColorPincode(true);
    } else {
      setPincodeError("");
      setColorPincode(false);
      localStorage.setItem("pincode", pincode);

      getCityFromPinCode(pincode);
    }
    console.log(`${pincodeError}`);
  };
  useEffect(() => {
    getCityFromPinCode(pincode);
  }, []);

  const getCityFromPinCode = (pincode) => {
    const url = `https://api.postalpincode.in/pincode/${pincode}`;

    axios
      .get(url)
      .then((response) => {
        const status = response.data[0].Status;

        if (status === "Success") {
          const postOfficeArray = response.data[0].PostOffice;
          setPincodeError("");
          setColorPincode(false);
          if (postOfficeArray && postOfficeArray.length > 0) {
            const obj = postOfficeArray[0];
            const district = obj.District;
            setCity(district);
            if (citiesList.includes(district)) {
              console.log(`Details of pin code are:\nDistrict: ${district}`);
              setPincodeInput(pincode);
              handleClose();
            } else {
              setPincodeError("Pincode is not serviceable");
              setColorPincode(true);
              localStorage.setItem('pincode',pincodeInput);
              setPincodeInput(localStorage.getItem("pincode"));
            }
          }
        } else {
          setPincodeError("Pincode is not serviceable");
          setColorPincode(true);
          localStorage.setItem('pincode',pincodeInput);
          setPincodeInput(localStorage.getItem("pincode"));

          console.log("Error in fetching data. Please check the API response.");
        }
      })
      .catch((error) => {
        console.error("Error in API request:", error);
      });
  };

  return (
    <>
      <Button id="displayFlexLocation" onClick={handleShow}>
        <div className="iconsDelivery">
          <TiLocation />
        </div>
        <div>
          <p className="deliveryText1">
            {label.deliveryLocation.buttonText} {pincodeInput}
          </p>
        </div>
      </Button>

      <Offcanvas id="offcanvas" show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <Offcanvas.Header id="offcanvas-header">
            <Offcanvas.Title id="deliveryTitle">
              {label.deliveryLocation.selectDeliveryLocation}
            </Offcanvas.Title>
            <RxCross1 id="colorCross" onClick={handleClose} />
          </Offcanvas.Header>

          <div
            className={colorPincode ? "inputDeliveryError" : "inputDelivery"}
          >
            <div>
              <input
                className="deliveryInput"
                type="text"
                onChange={(event) => {
                  handlePincode(event);
                }}
                placeholder={label.deliveryLocation.enterPincodePlaceholder}
              ></input>
            </div>
            <FaArrowRight className="arrowInput" onClick={handleClick} />
          </div>
          <p className="pincodeError">{pincodeError}</p>
          <div className="cityPincode">
            <p>
              {label.deliveryLocation.currentlySelectedPincode} : {pincodeInput}
            </p>

            <p className="city">{label.deliveryLocation.selectCity}</p>
            <div className="deliveryMain">
              <div>
                <img src={d1} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Bengaluru</p>
              </div>
              <div>
                <img src={d2} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Mumbai</p>
              </div>
              <div>
                <img src={d3} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Pune</p>
              </div>
              <div>
                <img src={d4} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Delhi</p>
              </div>
              <div>
                <img src={d5} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Gurugram</p>
              </div>
              <div>
                <img src={d6} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Noida</p>
              </div>
              <div>
                <img src={d7} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Hyderabad</p>
              </div>
              <div>
                <img src={d8} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Chennai</p>
              </div>
              <div>
                <img src={d9} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Ghaziabad</p>
              </div>
              <div>
                <img src={d10} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Faridabad</p>
              </div>
              <div>
                <img src={d11} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Jaipur</p>
              </div>
              <div>
                <img src={d12} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Mysuru</p>
              </div>
              <div>
                <img src={d13} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Chandigarh</p>
              </div>
              <div>
                <img src={d14} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Vijayawada</p>
              </div>
              <div>
                <img src={d15} className="deliveryImages" alt="delivery" />
                <p className="deliveryText">Nashik</p>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DeliveryLocation;
