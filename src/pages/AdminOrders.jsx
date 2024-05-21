import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "./AdminHeader";
import { createURL } from "./constant";

import "./modal.css";
import AuthGuard from "./AuthGuard";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "./Productview";
import CheckUser from "./CheckUser";
import {convertTimestampToReadable} from './DateTimeFormate';

export default function AdminOrders() {
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const nevigate=useNavigate();
  const token=sessionStorage['token'];
 //const token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBZG1pbkBnbWFpbC5jb20iLCJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MTU0MjE4NTYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNTcvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI1Ny8ifQ.dDnka19Hb7jEiLCPfeqbyvB6vi6CG1YLWtDTtXx35pU";

  useEffect(() => {
   
    getOrders();
  }, []);

  const getOrders=()=>{
    if(token === undefined){
      nevigate("/PageNotFound");
     
     return 
    }
    var role = CheckUser(token);
    const url = createURL(`api/Orders/AllOrders`);
    axios.get(url)
    .then((res)=>{
      
      setData(res.data);
      
    }
    )
  }

  
  const getData = (type, id) => {
    if(!token){
      nevigate("/Login");
      alert("please login")
      return 
    }
   
    const url = createURL(`api/Orders`);
    setAuthToken(sessionStorage.getItem("token"));
    axios
      .post(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          type === "Admin" ? setData(data.listOrders) : setItemData(data.listOrders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemDetail = (id) => {
    getData("UserItems",id);
  
  };


  
  return (
    <Fragment>
      <Header />
      <br></br>
      <div className="form-group col-md-12">
        <h3 style={{textAlign:"center"}}>All Orders</h3>
      </div>
      {data ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Order No</th>
              <th scope="col">Total</th>
              <th scope="col">Product Name</th>
           
             
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.userId}</td>
                  <td onClick={() => handleItemDetail(val.id)}>
                    {val.orderId}
                  </td>
                  <td>{val.totalAmount}</td>
                  <td>{val.productName}</td>
                 
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
     
      <AuthGuard/>
    </Fragment>
  );
}
