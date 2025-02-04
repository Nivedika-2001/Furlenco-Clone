import React, { useState } from "react";
import "../CSS/Login.css";
import "../CSS/OTP.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Indian from "../Images/India.png";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Login from "./Login";
const Details = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="custom" onClick={handleShow}>
        OTP
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div id="modelHeader">
          <ImCross onClick={handleClose} />
        </div>
        <div className="arrow">
          <IoArrowBackOutline onClick={<Login />} />
        </div>
        <Modal.Title id="looginH3">
          Looks like
          <br />
          you are <span className="started">New</span>
        </Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              
                <input
                  className="detailsInput details"
                  type="text"
                  placeholder="Name"
                  autoFocus
                  required
                />
                <input
                  className="detailsInput"
                  type="email"
                  placeholder="Email Address"
                  autoFocus
                  required
                />
             
            </Form.Group>
          </Form>
          <div id="model" class="modelBody">
            <Button id="loginButton">
              CONFIRM & CONTINUE <FaArrowRight />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Details;
