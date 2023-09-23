import React, { useState } from "react";
// import { auth } from "../firebase";
// import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
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
      //const userCredential= await createUserWithEmailAndPassword(auth, email, password);
      
      // // After user creation, update the user's display name with the username
      // await updateProfile(userCredential.user, {
      //   displayName: username,
      // });
      // console.log('Registrated!!')
      // toast.success("Registration successful !!");
      
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
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
  <h1>Enterprenur Community Platform</h1> 
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
        {/* <Link to="/forget-password"><label className="right-label">Forget password?</label></Link> */}
        <br/>
        <input
          type="password"
          className="form-control"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
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
