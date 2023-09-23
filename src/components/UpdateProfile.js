import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, updateDoc,setDoc ,doc} from "firebase/firestore"; 
import { storage, auth ,firestore} from "../firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject, // Import deleteObject function
  } from "firebase/storage";


function UpdateProfile() {
    const user = auth.currentUser;
    const currentUserid=user.uid;
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [proffession, setproffession] = useState('')

    const  handleUpdateProfile=async(e)=>{
        e.preventDefault();

        try{
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            username,
            proffession,
            
          }); 
          console.log('username uploaded')
        }catch (error) {
                console.error('Error updating document:', error);
              }
        // const userDocRef =  doc(firestore, "users", currentUserid)
        //   //  {
        //   //   posts: url
        //   // });
        //   try {
        //     await updateDoc(userDocRef, {
        //       username : username// This will add 'url' to the 'posts' array
        //     });
        //     console.log('Data added to the document successfully');
        //   } catch (error) {
        //     console.error('Error updating document:', error);
        //   }

    }


  return ( 
  <div className="text-center m-5-auto">
  <h1>Enterprenur Community Platform</h1> 
<ToastContainer />
<h2>Update Profile</h2>
<form >
    
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
        <label>proffession</label><br/>
        <input
          type="text"
          className="form-control"
          // placeholder="Email"
          value={proffession}
          onChange={(e) => setproffession(e.target.value)}
        /> 
        </p>
   
   
    <p>
        <button id="sub_btn" onClick={handleUpdateProfile} >Register</button>
    </p>
</form>
<footer>
<button id="sub_btn" onClick={() => navigate('/Profile')} >back</button>
   
</footer>
</div>
  );
}

export default UpdateProfile
