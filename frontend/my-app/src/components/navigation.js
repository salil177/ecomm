import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from "../context/context";
import cartImage from '../files/cart.svg';
import LogoutButton from './logoutButton';

function Navigation() {
  const { selectedProductId, setIsSidebarOpen ,  authStatus  } = useContext(ProductContext);
  const [hover, setHover] = useState(false);


  function removeDuplicates(arr) {
    if (!arr) {
      return [];
    }
    const reversedArray = [...arr].reverse();

    return reversedArray.filter((item, index, array) => array.findIndex(x => x.id === item.id) === index);
  }

  const uniqueProducts = removeDuplicates(selectedProductId.products);

  // Function to calculate the total quantity of items in the cart
  const calculateTotalQuantity = () => {
    if (!selectedProductId || !selectedProductId.products) {
      return 0;
    }

    // Summing up the quantities of all unique products in the cart
    const totalQuantity = uniqueProducts.reduce((total, product) => {
  
      return total + product.quantity;
    }, 0);

    return totalQuantity;
  };

  // Function to open the cart sidebar
  const openCart = () => {
    setIsSidebarOpen(true);
  };

  // Calculate the total quantity
  const totalQuantity = calculateTotalQuantity();

  return (
    <div className="nav-main">
      <ul className='first-nav'>
        <li>Home</li>
        <li>Shop All</li>
        <Link to="/forgetpassword">Forget Password</Link>  
      </ul>
      <div className="nav-cart-acc">
        <div onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
        <div className='account-btn cursor-pointer'>Account
        </div>
        {!authStatus && hover && (
  <div className='log-reg-btn'>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>
)}

        </div>
        <LogoutButton />
        <button className='cart-btn' onClick={openCart}>
          <img className='cart-icon' alt="cart-icon" src={process.env.PUBLIC_URL + cartImage} />
         {totalQuantity > 0 ?  <span className="cart-count">{totalQuantity}</span>: null}
        </button>
      </div>
    </div>
  );
}

export default Navigation;
