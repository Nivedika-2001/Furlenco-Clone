import React from "react";
import Logo1 from "../Images/Logo1.png";
import Facebook_Logo from "../Images/Facebook_Logo.png";
import LogoTwitter from "../Images/LogoTwitter.png";
import Instagram from "../Images/I.png";
import Linkden from "../Images/L.png";
import AppStore from "../Images/A6.png";
import GooglePlay from "../Images/G4.png";
import "../CSS/Footer.css";
import { useNavigate } from "react-router-dom";
const label = window.LabelConfig;
const Footer = () => {
  const navigate = useNavigate();
  const goToHelpCenter = () => {
    navigate("/helpCenter");
  };
  return (
    <div>
      <footer>
        <div className="footer">
          <img className="footerLogo" src={Logo1} alt="lOGO" />

          <div className="desciption">
            <p>{label.footer.description}</p>
          </div>

          <div className="socialMedia">
            <div>
              <p className="display">{label.footer.navigation.home}</p>
              <p className="display">{label.footer.navigation.buyFurniture}</p>
              <p className="display">{label.footer.navigation.rentFurniture}</p>
              <p className="display">{label.footer.navigation.annualReturns}</p>
            </div>
            <div>
              <p className="display">{label.footer.navigation.aboutUs}</p>
              <p className="display">{label.footer.navigation.privacyPolicy}</p>
              <p className="display">
                {label.footer.navigation.termsAndConditions}
              </p>
            </div>
            <div>
              <p>{label.footer.help.needHelp}</p>
              <button onClick={goToHelpCenter} className="designButton">
                {label.footer.help.helpCenter}
              </button>
            </div>
          </div>
          <div className="socialMedia alignItems">
            <div>
              <img
                className="footerIcons"
                src={Facebook_Logo}
                alt="FacebookLogo"
              />
              <img
                className="footerIcons"
                src={LogoTwitter}
                alt="TwitterLogo"
              />
              <img
                className="footerIcons"
                src={Instagram}
                alt="InstagramLogo"
              />
              <img className="footerIcons" src={Linkden} alt="LinkdenLogo" />
            </div>
            <div>
              <img className="download" src={AppStore} alt="Logo" />
              <img className="download" src={GooglePlay} alt="FacebookLogo" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
