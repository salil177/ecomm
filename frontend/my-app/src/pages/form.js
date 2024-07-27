import React, {useState , useEffect} from "react";
import axios from "axios";


function Register(){

  const [formData, setFormData] = useState({username:"" , password:""});
  const [redirect, setRedirect] = useState(false);

  const getdata = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSumbit ( e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/register', formData);
      console.log(res.data);

      if (res.data.message === 'Authentication successful') {
        // Set the redirect state to trigger redirection
        setRedirect(true);
      } else {
        // Handle other cases if needed
        console.log('Authentication failed');
      }
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (redirect) {
      // Perform the redirection
      window.location.href = '/products';
    }
  }, [redirect]);

    return (
        <div className="Form">
          <h2>Register</h2>
            <label>Username</label>
         <input type="email"  name ="username" onChange={getdata}></input>

         <br/>

         <label>Password</label>
         <input type="password"  name ="password" onChange={getdata}></input>

         <button type="submit" onClick={handleSumbit}>submit</button>
        </div>
      )
}

export default Register;