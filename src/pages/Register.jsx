import React, { Fragment, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { createURL } from "../constant";
import { validateEmail } from "./EmailValidate";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSave = (e) => {
    if (firstName === "") {
      alert("First Name can not be blank");
      return;
    }
    if (lastname === "") {
      alert("Last Name can not be blank");
      return;
    }
    if (email === "") {
      alert("Email should not be blank");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter email in correct formate!");
      return;
    }

    if (password === "") {
      alert("Password should not be blank");
      return;
    }

    if (password !== confirmpassword) {
      alert("Confirm password should be same as the password");
      return;
    }

    // e.preventDefault();
    const url = createURL("user");
    const data = {
      FirstName: firstName,
      LastName: lastname,
      Email: email,
      Password: password,
      ConfirmPassword: confirmpassword,
      Address: address,
    };

    axios
      .post(url, data)
      .then((response) => {
        const result = response.data;

        if (result) {
          alert("register successfully");
          navigate("/Product");
        } else {
          alert("User already exist, Please login");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("This email is already exist, Please login !");
        } else {
          alert("error comming while registering");
        }
      });
  };

  // const clear = () => {
  //     setFirstName("");
  //     setLastName("");

  // };

  return (
    <Fragment>
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
            backgroundImage: `url("./assets/back.jpg")`,
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
        className="container "
        style={{
          marginTop: 90,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          width: "40%",
        }}
      >
        <h1 className="text-center" style={{ padding: 15 }}>
          Sign Up
        </h1>
        <hr />
        <div className="col-md-8" style={{ marginLeft: 80 }}>
          <div style={{ alignContent: "center" }}>
            <div className="form my-3">
              <label htmlFor="First Name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Enter Your First Name"
              />
            </div>
            <div className="form my-3">
              <label htmlFor="Last Name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                placeholder="Enter Your Last Name"
              />
            </div>

            <div className="form my-3">
              <label htmlFor="Email">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                id="Email"
                value={email}
                placeholder="name@example.com"
              />
            </div>
            <div className="form  my-3">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="Password"
                placeholder="Password"
              />
            </div>
            <div className="form  my-3">
              <label htmlFor="Confirm Password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="CPassword"
                value={confirmpassword}
                placeholder="Confirm Password"
              />
            </div>

            <div className="form  my-3">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Please Enter the Address"
              />
            </div>
            <div className="my-3">
              <p>
                Already has an account?{" "}
                <Link
                  to="/login"
                  className="text-decoration-underline text-info"
                >
                  Log In
                </Link>{" "}
              </p>
            </div>
            <div className="text-center">
              <button
                className="my-2 mx-auto btn btn-dark"
                type="submit"
                onClick={(e) => handleSave(e)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
