import React, { useState } from "react";
import "../CSS/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Indian from "../Images/India.png";
import OTP from "./OTP";
function Login() {
  const [show, setShow] = useState(false);
  const [state,setState]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="custom" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
      <div id="modelHeader">
        <ImCross  onClick={handleClose} />
        </div>
        <Modal.Title id="looginH3">
          Let’s <br />
          get <span className="started">Started</span>
        </Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label id="looginP">
                Enter your phone number to proceed
              </Form.Label>
              <div className="combo">
                <img className="loginImg" src={Indian} alt="Indian Flag" />

                <Form.Control
                  id="formControl"
                  type="tel"
                  placeholder="Mobile Number"
                  autoFocus
                  required
                />
              </div>
            </Form.Group>
          </Form>
          <div id="model" class="modelBody">
            <Button id="loginButton" onClick={()=>{setState(true)}}>
              CONFIRM & CONTINUE <FaArrowRight />
            </Button>
          </div>
          <div>
         {state? <p>Resend OTP</p>:null}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
