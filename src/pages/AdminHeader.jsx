import React, { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Footer } from '../components';
import AuthGuard from './AuthGuard';
import CheckUser from './CheckUser';
import { NavLink } from 'react-router-dom';

export default function AdminHeader() {
  const [username, setUserName] = useState("");
  const nevigate = useNavigate();
  const token = sessionStorage['token'];


  useEffect(() => {
    setUserName(localStorage.getItem("username"));

  }, []);

  if (token == undefined) {
    nevigate("/PageNotFound");
    return;
  }
  else {
    var role = CheckUser(token);



    if (role != "Admin") {
      nevigate("/PageNotFound");
      //alert("please login")
      return
    }
  }
    const logout = (e) => {
      e.preventDefault();
      sessionStorage.removeItem("token");
      
      
      window.location.href = "/Home";
    
    };
  
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ margin: " 0px 20px 5px 20px" }}>
     

        <img src='../assets/logo.jpg' alt='logo' height={25} width={25} />

        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Mobile Store</NavLink>


        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav mr-auto">
           
            <li className="nav-item">
              <Link to="/Additem" className="nav-link">
                Product Management
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ListCustomers" className="nav-link">
                Customer Management
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AdminOrders" className="nav-link">
                Order Management
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/AdminCategory" className="nav-link">
                Category Management
              </Link>
            </li>
          </ul>
          

      
          <li className="btn btn-outline-success my-2 my-sm-0" style={{ margin: " 0px 10px 5px 10px" }} >
            Admin Dashboard
          </li>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={(e) => logout(e)}
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>
      <AuthGuard />
    </Fragment>
  );
}