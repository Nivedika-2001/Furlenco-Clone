import React, { useState } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import "../CSS/HelpQuery.css";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const HelpQuery = () => {
  const [formErrors, setFormErrors] = useState({
    name: "",
    userEmail: "",
    serviceType: "",
    issueType: "",
    subject: "",
    description: "",
    contactNumber: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  const [check, setCheck] = useState(false);
  const contactNoValid = /^[6-9]{1}[0-9]{9}$/;
  const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const nameValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const subjectValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const handleValidation = (event) => {
    event.preventDefault();
    let errors = {};
    if (formErrors.name === "" || !nameValid.test(formErrors.name)) {
      errors = {
        ...errors,
        name: formErrors.name === "" ? "Required" : "Invalid User Name",
      };
    }
    if (formErrors.userEmail === "" || !emailValid.test(formErrors.userEmail)) {
      errors = {
        ...errors,
        userEmail:
          formErrors.userEmail === "" ? "Required" : "Invalid User Email",
      };
    }
    if (formErrors.serviceType === "") {
      errors = {
        ...errors,
        serviceType: formErrors.serviceType === "" && "Required",
      };
    }
    if (formErrors.issueType === "") {
      errors = {
        ...errors,
        issueType: formErrors.issueType === "" && "Required",
      };
    }
    if (formErrors.subject === "" || !subjectValid.test(formErrors.subject)) {
      errors = {
        ...errors,
        subject: formErrors.subject === "" ? "Required" : "Invalid Subject",
      };
    }
    if (formErrors.description === "") {
      errors = {
        ...errors,
        description: formErrors.description === "" && "Required",
      };
    }
    if (
      formErrors.contactNumber === "" ||
      !contactNoValid.test(formErrors.contactNumber)
    ) {
      errors = {
        ...errors,
        contactNumber:
          formErrors.contactNumber === ""
            ? "Required"
            : "Invalid Contact Number",
      };
    }

    setErrorMsg(errors);
    if (Object.values(errors).every((msg) => msg === "")) {
      setCheck(true);
      console.log("taken here");
      console.log(event);
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target.form);

    const templateParams = {
      name: formData.get("name"),
      serviceType: formData.get("serviceType"),
      issueType: formData.get("issueType"),
      contactNumber: formData.get("contactNumber"),
      userEmail: formData.get("userEmail"),
    };

    emailjs
      .send(
        "service_npoh2nc",
        "template_hd67lab",
        templateParams,
        "EEUDoUT1xNKdxmMhz"
      )
      .then((result) => {
        console.log(result.text);
        Swal.fire({
            icon: 'success',
            title: 'Request Submitted Successfully',
            text: 'Thank you for reaching out to us. We will get back to you soon.',
          });
      })
      .catch((error) => {
        console.error(error.text);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while submitting the request. Please try again.',
          });
      });
  };

  return (
    <div className="divHelp">
      <Form id="formHelp" onSubmit={handleValidation}>
        <p className="helpPara">Submit Request Here</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabelHelp">Your Name</Form.Label>
          <Form.Control
          name="name"
            value={formErrors.name}
            type="text"
            className="formLabelControl"
            placeholder="Enter Your Name"
            onChange={(event) => {
              setFormErrors({ ...formErrors, name: event.target.value });
            }}
            required
          />
          <span className="errorQuery">{errorMsg.name}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabelHelp">Your Email address</Form.Label>
          <Form.Control
          name="userEmail"
            type="email"
            value={formErrors.userEmail}
            name="userEmail"
            className="formLabelControl"
            onChange={(event) => {
              setFormErrors({ ...formErrors, userEmail: event.target.value });
            }}
            placeholder="Enter Your Email"
            required
          />
          <span className="errorQuery">{errorMsg.userEmail}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabelHelp">Select Service Type</Form.Label>
          <Form.Select
          name="serviceType"
            value={formErrors.serviceType}
            aria-label="Default select example"
            className="formLabelControl"
            onChange={(event) => {
              setFormErrors({ ...formErrors, serviceType: event.target.value });
            }}
            required
          >
            <option value="" disabled="" selected="">
              Select Service Type
            </option>
            <option value="Rental">Rental subscription</option>
            <option value="UNLMTD">UNLMTD subscription</option>
            <option value="Buy">Buy Subscription</option>
          </Form.Select>
          <span className="errorQuery">{errorMsg.serviceType}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="formLabelHelp">Issue Type</Form.Label>

          <Form.Select
          name="issueType"
            value={formErrors.issueType}
            aria-label="Default select example"
            className="formLabelControl"
            onChange={(event) => {
              setFormErrors({ ...formErrors, issueType: event.target.value });
            }}
            required
          >
            <option value="" disabled="" selected="">
              Select Issue Type
            </option>
            <option value="KYC registration pending/rejected">
              KYC registration pending/rejected
            </option>
            <option value="Delay in delivery or Incomplete order delivered">
              Delay in delivery or Incomplete order delivered
            </option>
            <option value="Product delivered but Installation not done">
              Product delivered but Installation not done
            </option>
            <option value="Issue with Appliances - Washing Machine / Refrigerator/TV/Microwave / WaterPurifier">
              Issue with Appliances - Washing Machine /
              Refrigerator/TV/Microwave / WaterPurifier
            </option>
            <option value="Issues with furniture - Bed / Wardrobe/Couch/Study / Dining etc">
              Issues with furniture - Bed / Wardrobe/Couch/Study / Dining etc
            </option>
            <option value="Unable to create and schedule pickup from the app">
              Unable to create and schedule pickup from the app
            </option>
            <option value="Pickup Activity Cancelled/Delayed">
              Pickup Activity Cancelled/Delayed
            </option>
            <option value="Incomplete Pickup done all products not picked">
              Incomplete Pickup done all products not picked
            </option>
            <option value="Unable to reschedule order from the app">
              Unable to reschedule order from the app
            </option>
            <option value="Order rescheduled without information">
              Order rescheduled without information
            </option>
            <option value="Unable to renew my subscription - Renewal">
              Unable to renew my subscription - Renewal
            </option>
            <option value="Invoice clarification">Invoice clarification</option>
            <option value="Refund related">Refund related</option>
            <option value="Want to buy out the rented furniture">
              Want to buy out the rented furniture
            </option>
            <option value="Value added services - FCash / Flexi benefit pass / Furlenco care/">
              Value added services - FCash / Flexi benefit pass / Furlenco care/
            </option>
          </Form.Select>
          <span className="errorQuery">{errorMsg.issueType}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabelHelp">Subject</Form.Label>
          <Form.Control
          name="subject"
            value={formErrors.subject}
            className="formLabelControl"
            type="text"
            onChange={(event) => {
              setFormErrors({ ...formErrors, subject: event.target.value });
            }}
            placeholder="Please Enter a Subject Relevant To Your Request"
            required
          />
          <span className="errorQuery">{errorMsg.subject}</span>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="formLabelHelp">Description</Form.Label>
          <Form.Control
            value={formErrors.description}
            as="textarea"
            style={{ height: "150px" }}
            className="formLabelControl"
            aria-label="With textarea"
            onChange={(event) => {
              setFormErrors({ ...formErrors, description: event.target.value });
            }}
            required
          />
          <span className="errorQuery">{errorMsg.description}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabelHelp">Contact Number</Form.Label>
          <Form.Control
          name="contactNumber"
            value={formErrors.contactNumber}
            type="text"
            className="formLabelControl"
            placeholder="Enter Your Number"
            onChange={(event) => {
              setFormErrors({
                ...formErrors,
                contactNumber: event.target.value,
              });
            }}
            required
          />
          <span className="errorQuery">{errorMsg.contactNumber}</span>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label className="formLabelHelp">Attachments</Form.Label>
          <div className="custom-file">
            <Form.Control
              className="formLabelControl custom-file-input"
              type="file"
              id="file-input"
              multiple
            />
            <label className="custom-file-label" htmlFor="file-input">
              <span className="spanHelp">Add files&nbsp;</span>or Drop files
              here
            </label>
          </div>
        </Form.Group>
        <div className="buttonCenterHelp">
          <Button id="buttonQuery" type="submit" onClick={handleValidation}>
            Submit
          </Button>
        </div>
        {console.log("error:", JSON.stringify(errorMsg))}
      </Form>
    </div>
  );
};

export default HelpQuery;
