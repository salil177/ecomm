import React, {useState , useEffect , useContext} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import ProductContext from "../context/context";


function LogoutButton() {
  const { authStatus  } = useContext(ProductContext);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/logout',{ withCredentials: true });

      if (response.data.message === 'Logout successful') {
        // The logout was successful, you can redirect or perform other actions
        console.log('Logout successful');
        setRedirect(true);

      } else {
        // Handle errors if needed
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    if (redirect) {
      // Perform the redirection
      window.location.href = '/';
    }
  }, [redirect]);

  return ( authStatus ?
    <button onClick={handleLogout}>
     <Link to="/logout">Logout</Link>
    </button> : null
  );
}

export default LogoutButton;
