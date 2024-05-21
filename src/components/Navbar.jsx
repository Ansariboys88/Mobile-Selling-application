import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import CheckUser from "../pages/CheckUser";

const Navbar = () => {
  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = "/Home";
  };

  const token = sessionStorage["token"];
  if (token !== undefined) {
    var role = CheckUser(token);
  }

  if (sessionStorage.length === 0 || role === "Admin") {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top"
        style={{ position: "fixed", top: 0, right: 0, left: 0 }}
      >
        <div className="container">
          <img
             src="../assets/logo.jpg"
            alt="logo"
            height={50}
            width={50}
          />

          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            {" "}
            Mobile Store
          </NavLink>
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto my-2 text-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Home">
                  Home{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <div className="buttons text-center">
              <NavLink to="/login" className="btn btn-outline-dark m-2">
                <i className="fa fa-sign-in-alt mr-1"></i> Log In
              </NavLink>
              <NavLink to="/register" className="btn btn-outline-dark m-2">
                <i className="fa fa-user-plus mr-1"></i> Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
        <div className="container">
          <img
            src="../assets/logo.jpg"
            alt="logo"
            height={25}
            width={25}
          />

          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            {" "}
            Mobile Store
           
          </NavLink>
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse d-flex align-items-center justify-content-center"
            id="navbarSupportedContent"
            style={{ margin: " 0px 0px 5px 160px" }}
          >
            <ul className="navbar-nav m-auto d-flex justify-content-center my-2 text-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Home">
                  Home{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/product">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/displayorder">
                  Your Orders
                </NavLink>
              </li>
              <div style={{ margin: " 0px 0px 0px 140px" }}>
                <li className="nav-item d-flex align-items-center">
                  <button className="btn btn-outline-dark m-2" onClick={logout}>
                    <i className="fa fa-sign-in-alt mr-1"></i>Log out
                  </button>
                  <NavLink
                    to="/cart"
                    className="btn btn-outline-dark m-2 d-flex align-items-center"
                  >
                    <i className="fa fa-cart-shopping mr-1"></i> Cart{" "}
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
