import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { createURL } from "./constant";
import CheckUser from "./CheckUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    if (email.length === 0) {
      alert("Please enter email");
    } else if (password.length === 0) {
      alert("Please enter password");
    } else {
      const url = createURL(`api/User/login/${email}/${password}`);

      axios
        .post(url)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            const role = CheckUser(response.data);
            if (role === "Admin") {
              sessionStorage["token"] = response.data;
              navigate("/Additem");
            } else {
              sessionStorage["token"] = response.data;

              alert("Login Successful");
              navigate("/Product");
            }
          } else {
            alert("Please enter correct email and password");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <div
          style={{
            backgroundImage: `url("./assets/login.jpg")`,
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>
      <div
        className="container"
        style={{
          marginTop: 150,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: 30,
          width: "40%",
        }}
      >
        <h2 className="title" style={{ textAlign: "center" }}>
          Log In
        </h2>
        <hr />
        <div style={{ marginLeft: 90 }}>
          <div className="row">
            <div className="col-md-9">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-md-9">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-5 d-flex justify-content-center">
          <button
            onClick={onLogin}
            className="btn btn-success rounded-pill px-4 py-2 me-3"
            style={{ backgroundColor: "#28a745", color: "#fff", marginTop: 40 }}
          >
            Log In
          </button>
          <button
            onClick={onRegister}
            className="btn btn-primary rounded-pill px-4 py-2"
            style={{ backgroundColor: "#007bff", color: "#fff", marginTop: 40 }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
