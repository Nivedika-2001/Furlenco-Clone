import React from "react";
import help from "../Images/helpCenter.png";
import "../CSS/HelpCenter.css";
import { Link } from "react-router-dom";
const HelpCenter = () => {
  return (
    <div className="helpFlex">
      <div className="insideHelp">
        <h3 className="helpH3">Still Have Questions?</h3>
        <p className="helpP">
          Our customer care team is here for you! Email us
          <br /> at customercare@furlenco.com
        </p>
        <Link to="/raiseQuery" ><button className="helpCenterButton">Submit a query</button></Link>
      </div>
      <img src={help} className="imgHelp" alt="Help Center" />
    </div>
  );
};

export default HelpCenter;
