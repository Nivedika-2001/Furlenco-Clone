import React from "react";
import b1 from "../Images/buy1.webp";
import b2 from "../Images/buy2.webp";
import b3 from "../Images/buy3.webp";
import b4 from "../Images/buy4.webp";
import b5 from "../Images/buy5.webp";
import b6 from "../Images/buy6.webp";
import b7 from "../Images/buy7.webp";
import r1 from "../Images/rent1.webp";
import r2 from "../Images/rent2.webp";
import "../CSS/Buy.css";
import { Link } from "react-router-dom";
const Rent = () => {
  return (
    <>
      <h3 className="buyTitle">RENT FURNITURE</h3>

      <div className="buyProducts">
        <Link to="/bedroom" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={b2} alt="b1" />
            <p className="buyText">Bedroom</p>
          </div>
        </Link>
        <Link to="/livingRoom" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={b1} alt="b2" />
            <p className="buyText">Living Room</p>
          </div>
        </Link>
        <Link to="/appliances" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={r1} alt="b3" />
            <p className="buyText">Appliances</p>
          </div>
        </Link>
        <Link to="/storage" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={b3} alt="b4" />
            <p className="buyText">Storage</p>
          </div>
        </Link>
        <Link to="/study" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={b4} alt="b5" />
            <p className="buyText">Study</p>
          </div>
        </Link>
        <Link to="/Dining" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={b6} alt="b6" />
            <p className="buyText">Dining</p>
          </div>
        </Link>
        <Link to="/deals" className="removeDecoration">
          <div className="clickBuy">
            <img className="buyImages" src={r2} alt="r2" />
            <p className="buyText">Deals & Combos</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Rent;
