import React , {useState } from 'react';
import axios from "axios";


function Forgetpassword() {

    const [formData, setFormData] = useState({username:""});
  
    const getdata = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSumbit (e) {

        e.preventDefault();
      
        const res = axios.post('http://localhost:8080/forgetpassword' ,formData ,{ withCredentials: true });

        console.log(res);

     }



  return (
    <div className="Form">
    <h2>Forget Password</h2>
      <label>Username</label>
   <input type="email"  name ="username" onChange={getdata}></input>
   <br/>
   <button type="submit" onClick={handleSumbit}>submit</button>
   
  </div>
  )
}

export default Forgetpassword;