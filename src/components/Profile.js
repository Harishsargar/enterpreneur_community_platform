import React, { useEffect, useState } from 'react'
import { auth ,firestore} from "../firebase";
import Newspost from './Newspost';
import { useNavigate } from "react-router-dom"; 
import Photoupload from './Photoupload';
import {useAuth }from '../AuthContext';
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from 'firebase/auth';
import SearchUser from './SearchUser';
import { collection, updateDoc,getDoc,setDoc ,doc} from "firebase/firestore"; 


// import Search from './Search';

function Profile() {
  const [UserData, setUserData] = useState('')
  const [Defaultusername, setDefaultusername] = useState('')
  let navigate = useNavigate();
  const {  logout } = useAuth();
  const currentUser = auth.currentUser;
  const uid = currentUser.uid;


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

useEffect(() => {
  console.log(uid)
  getDoc(doc(firestore, "users", uid)).then(docSnap => {
    if (docSnap.exists()) {
      setUserData(docSnap.data());
      // console.log('check')
      // console.log(userData)
      // setDefaultusername(UserData.username)
      // console.log(Defaultusername)
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  })
  
}, [uid]);

  return (
    <div> 
      
      <h1> {UserData.username}</h1>
      <p> {UserData.proffession}</p>
      <p>****************************************************</p>
      {/* <Search/> */}
      <p>-------------------------</p>
      <SearchUser/>
      <p>-------------------------</p>

      <Newspost/><br/>
      <Photoupload/>
      <button onClick={ updateProfile}>update profile</button>
      <br/>
      <br/>
      <button onClick={ handleLogout}>Logout</button>
      <br/>
      <br/>
    </div>
  )
}

export default Profile
