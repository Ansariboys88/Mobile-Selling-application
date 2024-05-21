import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { createURL } from "./constant";
import axios from "axios";
import { setAuthToken } from "./Productview";
import "./Cart.css";
import CheckUser from "./CheckUser";


const Cart = () => {
  //  const state = useSelector((state) => state.handleCart);
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
 const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token === undefined) {
      navigate("/PageNotFound");
      return
    }

    getCartItems();
  }, []);

  const getCartItems = () => {

    var role = CheckUser(token);
    if (role == "CustomerUser") {

      setAuthToken(sessionStorage.getItem("token"));
      const url = createURL(`api/Carts/GetCartItems`);
      axios.get(url).then((res) => {
       
          if (Array.isArray(res.data)) {

            setData(res.data);
            calculateTotalPrice(res.data);

          } else {
            if (res.status === 204) {

              setData([]);
            }
            
          }

      })
      .catch((error) => {
        alert("Error occure during fetching the data !");    
       
      });
    }
    else {
      navigate('/PageNotFound');
      return;
    }



  };

  const calculateTotalPrice = (items) => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.unitPrice * item.quantity;
    });
    setTotalPrice(subtotal);
  };



  const deleteItem = (product) => {
    getCartItems();
    if (product.productId) {
      const url = createURL(`api/Carts/RemoveItem?productId=${product.productId}`);
      axios.delete(url).then((res) => {
        const updatedCartItems = cartItems.filter((item) => item.productId !== product.productId);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        getCartItems();
      });
    }
  };


  const reduceItem = (productId) => {

    if (productId) {
      const url = createURL(`api/Carts/decrement?productId=${productId}`);

      axios
        .put(url)
        .then((result) => {
          console.log(result);
          const dt = result.data;
          console.log(dt);
          if (result.status === 200) {
            
            getCartItems();
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }


  const IncreaseItem = (productId) => {

    if (productId) {
      const url = createURL(`api/Carts/Increment?productId=${productId}`);

      axios
        .put(url)
        .then((result) => {
          getCartItems();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }


  const addOrder = () => {
    setAuthToken(sessionStorage.getItem("token"));
    const url = createURL(`api/Orders/AddOrder`);
    axios.post(url).then((res) => {
      setOrderId(res.data);

      const updatedCartItems = cartItems.filter((item) => !cartItems.some((orderItem) => orderItem.productId === item.productId));

      calculateTotalPrice(updatedCartItems);
      alert("Order is processing. Your order ID is: " + res.data);
      getCartItems();

    });
  };



  // const addOrderById = (productId) => {
  //   setAuthToken(sessionStorage.getItem("token"));
  //   const url = createURL(`api/Orders/AddOrderById?productId=${productId}`);
  //   axios.post(url).then((res) => {
  //     setOrderId(res.data);

  //     const updatedCartItems = cartItems.filter((item) => !cartItems.some((orderItem) => orderItem.productId === item.productId));

  //     calculateTotalPrice(updatedCartItems);
  //     alert("Order is processing. Your order ID is: " + res.data);
  //     getCartItems();

  //   });
  // };


  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Cart Items</h3>
              <button className="btn btn-primary" onClick={addOrder}>
                Place Order
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => {
                    return (
                      <tr key={product.productId}>
                        
                        <td>{product.productName}</td>
                        <td>
                          <div className="d-flex align-items-center">



                            <button
                              className="btn btn-sm btn-outline-primary mr-2"
                              onClick={() => reduceItem(product.productId)}
                            
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-primary ml-2"
                              onClick={() => IncreaseItem(product.productId)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>Rs. {product.unitPrice}</td>
                        <td>Rs. {product.quantity * product.unitPrice}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteItem(product)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {data.length > 0 && (
          <div className="row">
            <div className="col-md-12 text-right">
              <h4 className="text-success">Total Price: Rs. {Math.round(totalPrice)}</h4>
            </div>
          </div>
        )}
      </div>
      
    </>
  );
};

export default Cart;
