import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createURL } from "./constant";
import axios from "axios";
import { setAuthToken } from "./Productview";
import { Navbar, Footer } from "../components";
import CheckUser from './CheckUser';
import {convertTimestampToReadable} from './DateTimeFormate';

const DisplayOrder = () => {
  
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("token");
  
 
 
  useEffect(() => {

    if(token == undefined){
      navigate("/PageNotFound");
      return 
    }

    else
    {
      var role = CheckUser(token);
      if ( role != "CustomerUser") {
      navigate("/PageNotFound");
      return ;
    }
   
    }
    getOrders();
  }, [navigate]);

  const getOrders = () => {
    setAuthToken(sessionStorage.getItem("token"));
    const url = createURL(`api/Orders/MyOrders`);
    axios.get(url).then((res) => {
      setOrders(res.data);
    });
  };



  return (
    <>
      <Navbar />
       

      <div className="table-responsive">
      <h3 style={{ textAlign: "center" }}  >My Orders</h3>
      <div style={{ margin: "10px 80px 10px 80px " }}>
     
        {/* <table className="table table-hover" > */}
        <table class="table table-success table-striped">
          <thead className="thead-light">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Order Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th> 
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td> 
                <td>Rs. {order.totalAmount}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>

    
    </>
  );
};

export default DisplayOrder;