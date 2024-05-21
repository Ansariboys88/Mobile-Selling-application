import React from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
const AboutPage = () => {
  return (
    <>
      <Navbar />

      <div className="hero border-1 pb-3">
        <div className="card bg-primary text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/about1.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-start">
            <div className="container d-flex flex-column align-items-start">
               <br>
               
               </br>
              <Link
                to="/Product"
                className="btn btn-primary"
                style={{ color: "#053f4c" }}
              >
              Start Buying
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <img
        className="card-img img-fluid"
        src="./assets/about1.jpg"
        alt="Card"
        height={500}
      />
      <div /> */}
      <Footer />
    </>
  );
};

export default AboutPage;
