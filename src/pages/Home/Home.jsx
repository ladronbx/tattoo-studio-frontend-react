import React from "react";
import "./Home.css";
import logoImage from "../../assets/img/logo-mala.png";
import backgroundImageHome1 from "../../assets/img/home2.png";
import backgroundImageHome2 from "../../assets/img/studio3.png";

export const Home = () => {
  return (
    <div className="home-style">
      <div className="blurry-background">
        <img src={backgroundImageHome1} alt="Background-1" />
        <img src={backgroundImageHome2} alt="Background-2" />
      </div>
      <div className="logo-image-home">
        <img src={logoImage} alt="Logo" />
      </div>
    </div>
  );
};
