import React, { useContext, useEffect, useRef, useState } from "react";
import "../CSS/Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Indian from "../Images/India.png";
import OTP from "./OTP";
//import firebase from "../firebases";
import "../CSS/Login.css";
import "../CSS/OTP.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Login from "./Login";
//import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { authentication } from "../firebases";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";
import MyContext from "./Context";
import { urlPath } from "../END_POINTS";
import { useWishlist } from "./WishlistContext";

const Combination = () => {
  const {
    wishlistStatus,
    updateWishlistStatus,
    clearLocalStorageOnLogout,
    loadUserSpecificData,
  } = useWishlist();
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
  const [show, setShow] = useState(false);
  const [state, setState] = useState(false);
  const [details, setDetails] = useState(false);
  const [color, setColor] = useState(false);
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const [color4, setColor4] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const [otp, setOTP] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const num1 = useRef();
  const num2 = useRef();
  const num3 = useRef();
  const num4 = useRef();
  const num5 = useRef();
  const num6 = useRef();
  const [code, setCode] = useState();
  const [timerError, setTimerError] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const phoneNoPattern = /^[6-9]{1}[0-9]{9}$/;
  const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const nameValid = /^[A-za-z]+$/;
  const otpValid =
    num1.current +
    num2.current +
    num3.current +
    num4.current +
    num5.current +
    num6.current;
  const [final, setfinal] = useState("");
  const [verification, setVerification] = useState(null);
  const [backend, setBackend] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setColor4(false);
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  //function to generate recaptcha
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        "expired-callback": () => {},
      }
    );
  };
  //function to verify the OTP
  const verifyOTP = () => {
    console.log(otpValid);
    let confirmationResult = window.confirmationResult;
    window.confirmationResult
      .confirm(otpValid)
      .then((result) => {
        // const user=result.user;
        setOTP("");
        setColor1(false);
        setDetails(true);
        getuserData();
        setLogin(true);
        setPhoneNumber(phoneNo);
        loadUserSpecificData(phoneNo);
        //setPhoneNumber(9146041852);
      })
      .catch((error) => {
        setOTP("Incorrect or Expired OTP");
        setColor1(true);
        setLogin(false);
        setDetails(false);
        console.log("Wrong code");
      });
  };
  //function to send OTP
  const sendOTP = () => {
    setMinutes(0);
    setSeconds(30);
  };
  //function to resend OTP
  const resendOTP = () => {
    setColor4(false);
    setMinutes(0);
    setSeconds(30);
  };
  //function to validate name and email field
  const handleDetails = () => {
    if (name === "") {
      setDetailsError("Required");
      setColor2(true);
    } else if (!nameValid.test(name)) {
      setDetailsError("Please enter a valid name.");
      setColor2(true);
    } else if (email === "") {
      setDetailsError("Required");
      setColor3(true);
      setColor2(false);
    } else if (!emailValid.test(email)) {
      setDetailsError("Please enter a valid email address.");
      setColor3(true);
      setColor2(false);
    } else {
      handleClose(true);
      setColor2(false);
      setColor3(false);
      postuserData();
      getUserName();
      getUserRole();
    }
  };
  //function to validate the OTP field
  const handleOTP = () => {
    if (
      num1.current.value === "" ||
      num2.current.value === "" ||
      num3.current.value === "" ||
      num4.current.value === "" ||
      num5.current.value === "" ||
      num6.current.value === ""
    ) {
      setOTP("Incorrect or Expired OTP");
      setColor1(true);
      setDetails(false);
    } else {
      verifyOTP();
    }
  };
  //function to validate phone Number
  const handleSubmit = () => {
    if (phoneNo === "") {
      setError("Required");
      setColor(true);
    } else if (!phoneNoPattern.test(phoneNo)) {
      setError("Please enter a valid phone number.");
      setColor(true);
    } else {
      setState(true);
      setColor(false);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      //setCode(appVerifier);
      let phoneNumber = "+91" + phoneNo;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log(confirmationResult);
          setCode(confirmationResult);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //function to add user details once successfully logged in
  const postuserData = () => {
    const RequestBody = {
      phoneNo: phoneNo,
      userName: name,
      userEmail: email,
    };
    let url = "http://localhost:8080/User/save";
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
          console.log(response.data);
        }
      })
      .catch((error) => {
        alert("Caught an unexpected error.");
      });
  };
  //function to find username
  const getUserName = () => {
    let url = `http://localhost:8080/User/getName/${phoneNo}`;
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
          console.log(response.data);
          setUserName(response.data);
        }
      })
      .catch((error) => {
        alert("Caught an unexpected error.");
      });
  };
  //function to check whether the visiter has logged in first time or already a user
  const getuserData = () => {
    let url = `http://localhost:8080/User/fetch/${phoneNo}`;
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
          console.log(response.data);
          setBackend(response.data);
          console.log(`backend ${backend}`);
          if (backend) {
            setShow(true);
            //handleShow(false)
            getUserName();
            getUserRole();
          }
        }
      })
      .catch((error) => {
        alert("Caught an unexpected error.");
      });
  };
  const getUserRole = () => {
    //let url = `http://localhost:8080/User/getRoleByPhoneNo/${phoneNo}`;
    let url = urlPath + `/User/getRoleByPhoneNo/${phoneNo}`;
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
          console.log(response.data);
          setRole(response.data);
        }
      })
      .catch((error) => {
        alert("Caught an unexpected error.");
      });
  };
  return (
    <>
      {backend ? null : (
        <div>
          <Button id="login" variant="login" onClick={handleShow}>
            Login
          </Button>

          <Modal show={show} onHide={handleClose}>
            {backend ? null : (
              <div id="modelHeader">
                <ImCross onClick={handleClose} />
              </div>
            )}

            {state ? (
              details ? (
                backend ? null : (
                  <>
                    <div className="arrow">
                      <IoArrowBackOutline
                        onClick={() => {
                          setDetails(false);
                        }}
                      />
                    </div>
                    <Modal.Title id="looginH3">
                      Looks like
                      <br />
                      you are <span className="started">New</span>
                    </Modal.Title>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <input
                            className={
                              color2 ? "detailsInput" : "detailsInput details"
                            }
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                            value={name}
                            type="text"
                            maxLength={40}
                            placeholder="Name"
                            autoFocus
                            required
                          />
                          {color2 ? (
                            <p className="errorDetails">{detailsError}</p>
                          ) : null}
                          <input
                            className="detailsInput"
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                            type="email"
                            value={email}
                            placeholder="Email Address"
                            required
                          />
                          {color3 ? (
                            <p className="error">{detailsError}</p>
                          ) : null}
                        </Form.Group>
                      </Form>
                      <div id="model" class="modelBody">
                        <Button
                          id="loginButton"
                          onClick={() => {
                            handleDetails();
                          }}
                        >
                          CONFIRM & CONTINUE <FaArrowRight />
                        </Button>
                      </div>
                    </Modal.Body>
                  </>
                )
              ) : (
                <div>
                  <div className="arrow">
                    <IoArrowBackOutline
                      onClick={() => {
                        setState(false);
                      }}
                    />
                  </div>
                  <Modal.Title id="looginH3">
                    Verify
                    <br />
                    using <span className="started">OTP</span>
                  </Modal.Title>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label id="looginPp">
                          Sent to {phoneNo}
                          <MdEdit
                            id="edit"
                            onClick={() => {
                              setState(false);
                            }}
                          />
                        </Form.Label>
                        <div className={color1 ? "combo2" : "combo1"}>
                          <input
                            className={color1 ? "otpError" : "otp"}
                            ref={num1}
                            maxLength="1"
                            onKeyDown={(event) =>
                              ["e", "E", "+", "-"].includes(event.key) &&
                              event.preventDefault()
                            }
                            onChange={(event) => {
                              num1.current = event.target.value;
                              num2.current.focus();
                            }}
                            pattern="[0-9]{1}"
                            type="number"
                          />
                          <input
                            className={color1 ? "otpError" : "otp"}
                            ref={num2}
                            maxLength="1"
                            onKeyDown={(event) =>
                              ["e", "E", "+", "-"].includes(event.key) &&
                              event.preventDefault()
                            }
                            onChange={(event) => {
                              num2.current = event.target.value;
                              num3.current.focus();
                            }}
                            pattern="[0-9]{1}"
                            type="number"
                          />
                          <input
                            className={color1 ? "otpError" : "otp"}
                            ref={num3}
                            maxLength="1"
                            onKeyDown={(event) =>
                              ["e", "E", "+", "-"].includes(event.key) &&
                              event.preventDefault()
                            }
                            onChange={(event) => {
                              num3.current = event.target.value;
                              num4.current.focus();
                            }}
                            pattern="[0-9]{1}"
                            type="number"
                          />
                          <input
                            className={color1 ? "otpError" : "otp"}
                            ref={num4}
                            maxLength="1"
                            onKeyDown={(event) =>
                              ["e", "E", "+", "-"].includes(event.key) &&
                              event.preventDefault()
                            }
                            onChange={(event) => {
                              num4.current = event.target.value;
                              num5.current.focus();
                            }}
                            pattern="[0-9]{1}"
                            size="1"
                            max="9"
                            min="0"
                            type="number"
                          />
                          <input
                            className={color1 ? "otpError" : "otp"}
                            ref={num5}
                            maxLength="1"
                            onKeyDown={(event) =>
                              ["e", "E", "+", "-"].includes(event.key) &&
                              event.preventDefault()
                            }
                            onChange={(event) => {
                              num5.current = event.target.value;
                              num6.current.focus();
                            }}
                            pattern="[0-9]{1}"
                            size="1"
                            max="9"
                            min="0"
                            type="number"
                          />
                          <input
                            className={color1 ? "otpError" : "otp"}
                            ref={num6}
                            maxLength="1"
                            onKeyDown={(event) =>
                              ["e", "E", "+", "-"].includes(event.key) &&
                              event.preventDefault()
                            }
                            onChange={(event) => {
                              num6.current = event.target.value;
                            }}
                            pattern="[0-9]{1}"
                            size="1"
                            max="9"
                            min="0"
                            type="number"
                          />
                        </div>
                      </Form.Group>
                    </Form>
                    {color1 ? <p className="error">{otp}</p> : null}
                    {color4 ? <p className="timerError">{timerError}</p> : null}
                    <div id="model" class="modelBody">
                      <Button
                        id="loginButton"
                        onClick={() => {
                          handleOTP();
                          setColor4(false);
                        }}
                      >
                        CONFIRM & CONTINUE <FaArrowRight />
                      </Button>
                      {seconds === 0 && minutes === 0 ? (
                        <p
                          onClick={() => {
                            setColor4(false);
                            resendOTP();
                            setTimerError("OTP sent again");
                            setColor4(true);
                            window.recaptchaVerifier = new RecaptchaVerifier(
                              authentication,
                              "recaptcha-container",
                              {
                                size: "invisible",
                                callback: (response) => {
                                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                                },
                                "expired-callback": () => {},
                              }
                            );
                            let appVerifier = window.recaptchaVerifier;
                            //setCode(appVerifier);
                            let phoneNumber = "+91" + phoneNo;
                            signInWithPhoneNumber(
                              authentication,
                              phoneNumber,
                              appVerifier
                            )
                              .then((confirmationResult) => {
                                window.confirmationResult = confirmationResult;
                                console.log(confirmationResult);
                                setCode(confirmationResult);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                          className="resendOTP"
                        >
                          Resend OTP
                        </p>
                      ) : (
                        <p className="resendButton">
                          Resend OTP {minutes}:{seconds}
                        </p>
                      )}
                    </div>
                  </Modal.Body>
                </div>
              )
            ) : (
              <div>
                <Modal.Title id="looginH3">
                  Let’s <br />
                  get <span className="started">Started</span>
                </Modal.Title>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label id="looginP">
                        Enter your phone number to proceed
                      </Form.Label>
                      <div className={color ? "comboError" : "combo"}>
                        <img
                          className="loginImg"
                          src={Indian}
                          alt="Indian Flag"
                        />

                        <input
                          className="formControl"
                          type="number"
                          defaultCountry="IN"
                          value={phoneNo}
                          onChange={(event) => {
                            setPhoneNo(event.target.value);
                          }}
                          placeholder="Mobile Number"
                          autoFocus
                          required
                        />
                      </div>
                      {color ? <p className="error">{error}</p> : null}
                    </Form.Group>
                  </Form>
                  <div id="model" class="modelBody">
                    <Button
                      id="loginButton"
                      onClick={() => {
                        handleSubmit();
                        sendOTP();
                      }}
                    >
                      CONFIRM & CONTINUE <FaArrowRight />
                    </Button>
                  </div>
                  <div>{state ? <p>Resend OTP</p> : null}</div>
                </Modal.Body>
              </div>
            )}
            <div id="recaptcha-container" className="recaptcha"></div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Combination;
