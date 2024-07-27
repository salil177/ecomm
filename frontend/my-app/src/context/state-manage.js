import React, { useState , useEffect} from 'react';
import ProductContext from './context';
import {useCookies} from 'react-cookie';

 const ProductProvider = ({ children }) => {
  const [selectedProductId, setSelectedProductId] = useState({id:"" , title:"" , price:"" , image:"" , quantity: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cookies] = useCookies(['connect.sid']);
  const [authStatus, setAuthStatus] = useState(false);



  useEffect(() => {
    if (cookies && Object.keys(cookies).length > 0) {
      setAuthStatus(true);
    }
  }, [cookies]);


  return (
    <ProductContext.Provider value={{ selectedProductId, setSelectedProductId ,  isSidebarOpen, setIsSidebarOpen ,  authStatus, setAuthStatus , cookies }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
