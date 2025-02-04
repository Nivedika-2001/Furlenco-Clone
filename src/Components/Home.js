import React from "react";
import Img1 from "../Images/Img1.webp";
import Img2 from "../Images/Img2.webp";
import Img3 from "../Images/Img3.webp";
import Img4 from "../Images/Img4.webp";
import Img5 from "../Images/Img5.webp";
import Img6 from "../Images/Img6.webp";
import Img7 from "../Images/template.webp";
import { Carousel } from "react-bootstrap";
import p1 from "../Images/p1.webp";
import p2 from "../Images/p2.webp";
import p3 from "../Images/p3.webp";
import p4 from "../Images/p4.webp";
import "../CSS/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img class="d-block w-100 slides" src={Img1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img class="d-block w-100 slides" src={Img2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img class="d-block w-100 slides" src={Img3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img class="d-block w-100 slides" src={Img4} alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img class="d-block w-100 slides" src={Img5} alt="Fifth slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img class="d-block w-100 slides" src={Img6} alt="Sixth slide" />
        </Carousel.Item>
      </Carousel>
      <div className="rentProduct">
        <div class="card cardDesign">
        <div class="imgDiv">
        <img src={p1} class="card-img-top" alt="img" /></div>
          <div class="card-body">
            <h5 class="card-title titleProduct">
              Linie Solid Wood Bedside TableIn Teak Finish
            </h5>
            <span className="rent">Rent</span>
            <p class="card-text">₹200/mo</p>
          </div>
        </div>
        <div class="card cardDesign">
        <div class="imgDiv">
        <img src={p2} class="card-img-top" alt="img" /></div>
          <div class="card-body">
            <h5 class="card-title titleProduct">
              Sol Solid Wood Queen Bed In Teak Finish
            </h5>
            <span className="rent">Rent</span>
            <p class="card-text">₹624/mo</p>
          </div>
        </div>
        <div class="card cardDesign">
        <div class="imgDiv">
        <img src={p3} class="card-img-top" alt="img" /></div>
          <div class="card-body">
            <h5 class="card-title titleProduct">
              Noah Fabric 3 Seater Sofa in Turquoise Color
            </h5>
            <span className="rent">Rent</span>
            <p class="card-text">₹560/mo</p>
          </div>
        </div>
        <div class="card cardDesign">
        <div class="imgDiv">
          <img src={p4} class="card-img-top" alt="img" /></div>
          <div class="card-body">
            <h5 class="card-title titleProduct">
              Haimish Engineered Wood 2 Door Wardrobe with Mirror In Carbon Grey
              Finish
            </h5>
            <span className="rent">Rent</span>
            <p class="card-text">₹560/mo</p>
          </div>
        </div>
      </div>

      <img className="template" src={Img7} alt="template" />
    </>
  );
};

export default Home;
