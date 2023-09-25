import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext"; // Import useAuth
import '../App.css'

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const {  login } = useAuth(); // Access currentUser and loginFunction from the context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from the context
      await login(email, password);
      console.log("Signed In ! ")
      
      toast.success("Signed In !");
      localStorage.setItem("userEmail", email);
      setTimeout(() => {
        navigate("/Profile");
      }, 2000);
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
//     <div className="login-container">
//     <ToastContainer />
//     <div className="login-card">
//       <h2>Login</h2>
//       <div className="form-group">
//         <label>Email</label>
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={handleLogin}>
//         Login
//       </button>
//       <p>
//         Don't have an account? <Link to="/Register">Register here</Link>
//       </p>
//     </div>
//   </div>
// );
<div className="text-center m-5-auto">
  <h1>Enterprenur Community Platform</h1> 
<ToastContainer />
<h2>Sign in to us</h2>
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
        <label>Password</label>
        {/* <Link to="/forget-password"><label className="right-label">Forget password?</label></Link> */}
        <br/>
        <input
          type="password"
          className="form-control"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
    </p>
    <p>
        <button id="sub_btn" onClick={handleLogin} >Login</button>
    </p>
</form>
<footer>
    <p>Do not have an account <Link to="/register">Create an account</Link>.</p>
   
</footer>
</div>
  )
};

export default Login;
