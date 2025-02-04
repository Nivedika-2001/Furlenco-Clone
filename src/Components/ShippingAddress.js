import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import "../CSS/Cart.css";

function ShippingAddress({addressCheck,setAddressCheck}) {
  const [show, setShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [validated, setValidated] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        event.preventDefault()
      const newAddress = {
        address,
        city,
        state,
        pincode
      };
      setAddresses([...addresses, newAddress]);
      setShow(false); // Close modal only when form is valid
    }
    setValidated(true);
    setAddress("")
    setCity("")
    setPincode("")
    setState("")
  };

  const handleAddressChange = (index) => {

    setSelectedAddress(index);
    setAddressCheck(true);
  };

  return (
    <>
      <button className="buttonAddress" onClick={handleShow}>
        <GoPlus className="goPLus" />
        Add New Address
      </button>
      <div className="addressDiv">
      {addresses.map((addr, index) => (
        <div key={index} className="addressBox">
            <div> <Form.Check
            type="radio"
            name="address"
            checked={selectedAddress === index}
            onChange={() => handleAddressChange(index)}
            /></div>
            <div> <h6>Address : {addr.address}</h6>
            <h6>City : {addr.city}</h6>
            <h6>State : {addr.state}</h6>
            <h6>Pincode : {addr.pincode}</h6></div>
           
        </div>
      ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City Name"
                pattern="[A-Za-z ]+"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid city name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>State</Form.Label>
              <Form.Select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select State</option>
                {indianStates.map((state, index) => (
                  <option key={index}>{state}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select your state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pincode"
                pattern="[1-9][0-9]{5}"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid 6-digit Indian pincode.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShippingAddress;
