import React, { useState } from 'react';
import axios from 'axios';

function Resetpassword() {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (event, setPassword) => {
    setPassword(event.target.value);
  };

  const handlePasswordBlur = () => {
    // Check if passwords match
    setPasswordsMatch(password1 === password2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match before submitting
    if (!passwordsMatch) {
      console.log("Passwords do not match.");
      return;
    }

    // Make the post request using Axios
    try {
      const response = await axios.post('http://localhost:8080/resetpassword', {
        password: password1,
      });

      // Handle the response as needed
      if (response.status === 200) {
        console.log('Password reset successful.');
        // Redirect or perform any other actions after successful password reset
      } else {
        console.log('Password reset failed.');
        // Handle the error case
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the network error or any other issues
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          New Password
          <input
            type="password"
            value={password1}
            onChange={(e) => handlePasswordChange(e, setPassword1)}
          />
        </label>
        <br />
        <label>
          Confirm New Password
          <input
            type="password"
            value={password2}
            onChange={(e) => handlePasswordChange(e, setPassword2)}
            onBlur={handlePasswordBlur}
          />
        </label>
        <br />
        {!passwordsMatch && <p>Passwords do not match.</p>}
        <br />
        <button type="submit">Reset Password</button>
      </div>
    </form>
  );
}

export default Resetpassword;
