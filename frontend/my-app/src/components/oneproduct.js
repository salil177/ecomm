import React, { useContext, useState } from "react";
import ProductContext from "../context/context";

function Oneproduct(props) {
  const {  setSelectedProductId } = useContext(ProductContext);

  const [count , setcount] = useState(0);
  
  

  function onbuyHandle() {

    setcount((pre)=>{
      return pre + 1
    })

    setSelectedProductId((prevstate) => ({
      products: [
        ...(prevstate.products || []),
        {
          id: props.id,
          image: props.image,
          title: props.title,
          price: props.price,
          quantity: count + 1,
        },
      ],
    }));
  }

  return (
    <div className="oneproduct-card">
      <img alt={props.title} src={props.image} />
      <p className="product-title">{props.title} </p>
      <p className="product-price">Rs. {props.price}</p>

      <button className="buy-btn" onClick={onbuyHandle}>
        Buy Now
      </button>
    </div>
  );
}

export default Oneproduct;
