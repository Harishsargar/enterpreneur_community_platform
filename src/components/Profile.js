import React from 'react'
import { auth } from "../firebase";
import Newspost from './Newspost';
import { useNavigate } from "react-router-dom"; 
import Photoupload from './Photoupload';
import {useAuth }from '../AuthContext';
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from 'firebase/auth';
import SearchUser from './SearchUser';


// import Search from './Search';

function Profile() {
  let navigate = useNavigate();
  const {  logout } = useAuth();
  const currentUser = auth.currentUser;

if (currentUser) {
 
  // console.log("User's username:", currentUser.displayName);
}

const updateProfile=()=>{
  navigate('/UpdateProfile');
}

const handleLogout = async () => {
  try {
    // Call the login function from the context
    await logout();
    console.log("logout !!!")
    alert("logout successfully")
    // toast.success("Logout Successfully !!")
   
    navigate("/");
   
    
    
  } catch (error) {
    console.error("Error while logging out:", error.message);
  }
};

  return (
    <div> 
      
      <h1>Welcome  - {currentUser.displayName}</h1>
      {/* <Search/> */}
      <p>-------------------------</p>
      <SearchUser/>
      <p>-------------------------</p>

      <Newspost/><br/>
      <Photoupload/>
      <button onClick={ updateProfile}>update profile</button>
      <button onClick={ handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
