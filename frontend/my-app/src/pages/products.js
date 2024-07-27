import React, { useEffect, useState } from 'react';
import axios from "axios";
import Oneproduct from '../components/oneproduct';

function Products() {
  const [products, setProducts] = useState([]);

  const allProducts = async function () {
    try {
      const res = await axios.get('http://localhost:8080/products', { withCredentials: true });
      setProducts(res.data); // Use setProducts to update the state
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error response:', error.response); // Log the response object if available
    }
  };

  useEffect(() => {
    allProducts();
  }, []); 

  return (
    <div className="all-products">
      {products.map(e => (
        <Oneproduct key={e._id} title={e.title} image={e.image} price={e.price} id={e._id}/>
      ))}

      
    </div>
  );
}

export default Products;
