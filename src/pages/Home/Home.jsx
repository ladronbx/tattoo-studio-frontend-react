import React from "react";
import "./Home.css";
import backgroundImageHome2 from "../../assets/img/studio3.png";
import backgroundImageHome3 from "../../assets/img/logo-mala.png";

export const Home = () => {
  return (
    <div className="home-style">
      <div className="background-img-container">
        <div className="studio-img"><img src={backgroundImageHome2} alt="Background-2" /></div>
        <div className="logo-mala">
          <img src={backgroundImageHome3} alt="Background-3" />
          <div className="text-call-home"> 6654096111 </div>
          <div className="adress-container">
            <div className="street">C. del Palleter, 24, 46008 València, Valencia </div>

            <iframe
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12319.95692315449!2d-0.386509!3d39.469572!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f939c1b55e7%3A0x2fbc6f3fd6b58b0e!2sLa%20tinta%20que%20habito!5e0!3m2!1ses!2ses!4v1700296001613!5m2!1ses!2ses"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>

            <div class="mapa"><a href="#">Ver en Google Maps</a></div>

          </div>
        </div>
      </div>
    </div>
  );
};
