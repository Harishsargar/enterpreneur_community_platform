import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../AuthContext"; // Import useAuth

const Registration = () => {
  const {  register } = useAuth(); 
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");




  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await register(email,password,username)
       console.log('Registrated!!')
      toast.success("Registration successful !!");
      setTimeout(() => {
          navigate("/");
        }, 2000);
      
      // alert("Registration successful!");
    } catch (error) {
      toast.error("Registration Unsuccessful!!");
      console.error("Error registering user:", error.code, error.message);
    }
  };
 

  return (
    <div className="text-center m-5-auto">
  <h1>Social Media Website</h1> 
<ToastContainer />
<h2>Register</h2>
<form >
    <p>
        <label>Email address</label><br/>
        <input
          type="email"
          className="form-control"
          // placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
        </p>
        <p>
        <label>Username</label><br/>
        <input
          type="text"
          className="form-control"
          // placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> 
        </p>
    <p>
        <label>Password</label>
        <br/>
        <input
          type="password"
          className="form-control"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          {/* <input type="checkbox" onclick="myFunction()">Show Password</input> */}
    </p>
    
    <p>
        <button id="sub_btn" onClick={handleRegistration} >Register</button>
    </p>
</form>

<footer>
    <p>Already have an account <Link to="/">Login</Link>.</p>
   
</footer>
</div>
  );
};

export default Registration;
