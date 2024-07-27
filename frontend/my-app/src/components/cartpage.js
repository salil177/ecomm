import React, { useContext, useEffect } from 'react';
import ProductContext from "../context/context";

function Cartpage() {
  const { isSidebarOpen, setIsSidebarOpen, selectedProductId, setSelectedProductId } = useContext(ProductContext);

  // Function to remove duplicate items based on their 'id'
  function removeDuplicates(arr) {
    if (!arr) {
      return [];
    }
    const reversedArray = [...arr].reverse();

    return reversedArray.filter((item, index, array) => array.findIndex(x => x.id === item.id) === index);
  }

  const uniqueProducts = removeDuplicates(selectedProductId.products);

  function closeCart() {
    setIsSidebarOpen(false);
  }

  // Function to update the quantity for a specific product
  const setQuantity = (productId, newQuantity) => {
    // Ensure the new quantity is between 1 and the current quantity
    newQuantity = Math.max(1, newQuantity);

    setSelectedProductId((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      ),
    }));
  };

  // Effect to update the body styles when isSidebarOpen changes
  useEffect(() => {
    if (isSidebarOpen) {
      // Freeze the window scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Allow scrolling when the cart is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Clean up the styles when the component is unmounted
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  return (
    <>
      {isSidebarOpen ?
        <div className='cart-page'>
          <div className="flex-between">
            <h2>Your cart</h2>
            <button className='close-cart' onClick={closeCart}>x</button>
          </div>
          {uniqueProducts.map((product) => (
            <div className='cart-item' key={product.id}>
              <img alt={product.title} src={product.image} />
              <p className="product-title">{product.title}</p>
              <p className="product-price">Rs. {product.price}</p>
              <button onClick={() => setQuantity(product.id, product.quantity - 1)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => setQuantity(product.id, product.quantity + 1)}>+</button>
            </div>
          ))}
        </div>
        : null
      }
    </>
  );
}

export default Cartpage;
