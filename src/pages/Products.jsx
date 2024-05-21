import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Footer, Navbar } from "../components"
import { createURL } from './constant';
import './Products.css'
import { NavLink } from 'react-router-dom';

const Products = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    const url = createURL('api/Products');
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setFilteredProducts(res.data);
      })
      .catch((error) => {
        alert("Sorry trouble in communicating with resource");
      });

  }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.value.trim();
    setSearchTerm(searchValue);
    const newFilteredProducts = product.filter((prod) => {
      return prod.productName.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredProducts(newFilteredProducts);
    if (newFilteredProducts.length === 0) {
      setNoProductsFound(true);
    } else {
      setNoProductsFound(false);
    }

}

  return (
    <>
      <Navbar />
      <br></br>
      <div className='container' style={{ marginTop: 90 }}>
        <form onSubmit={(e) => e.preventDefault()} className='my-4 d-flex justify-content-center'>
          <div className="input-group" style={{ width: '40%' }}>
            <input
              type='text'
              placeholder='Search products...'
              value={searchTerm}
              onChange={handleSearch}
              className='form-control'
            />
            <div className="input-group-append ml-2">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
         
        </form>
        {noProductsFound ? (
          <div className="alert alert-warning">
            No products found for the search term "{searchTerm}"
          </div>
        ) : (
          <div className='row row-cols-3 g-4'>
            {filteredProducts.map((prod) => {
              return (
                <div key={prod.productId} className="col">
                  <div className="card">
                    <div className='conatainer' style={{ alignSelf: "center" }}>
                      <img src={prod.imageURL} className="prod-img card-img-top" alt={prod.productName} />
                    </div>

                    <div className="card-body text-center">
                      <h5 className="card-title">{prod.productName}</h5>
                      <p className="card-text">{prod.productDescription.slice(0, 50)}</p>
                      <NavLink to={`/productview/${prod.productId}`} className="btn btn-primary">View</NavLink>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <br /> <br />
    
    </>
  )
}

export default Products;
