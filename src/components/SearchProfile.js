import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import {getDoc,doc} from "firebase/firestore"; 
import { firestore} from "../firebase";
import '../css/SearchProfile.css'

 function  SearchProfile() {
  const { uid } = useParams(); // Access the UID from route parameters
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();


  const handleBack=(e)=>{
    e.preventDefault();
    navigate('/Profile')
  }

  useEffect(() => {
    console.log(uid)
    getDoc(doc(firestore, "users", uid)).then(docSnap => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        // console.log('check')
        // console.log(userData)
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    })

  }, [uid]);

  return (
    // <div>
    //   <h1> Profile</h1>
    //   {userData && (
    //     <div>
    //       <p>Username: {userData.username}</p>
    //       <p>proffession: {userData.proffession}</p>
    //       {/* <p>photo: {userData.photoURLs}</p> */}
          
    //       {/* <img src={userData.photoURLs}  alt="Profile Picture" /> */}
    //       <p>Photos:</p>
    //           {userData.photoURLs.map((photo, index) => (
    //             <img key={index} src={photo} 
    //             style={{width: "192px", height: "192px"}}
    //             alt={`Photo ${index}`} />))}
    //     </div>
    //   )}

    //   <br/>
    //         <br/>

    //   <footer>
    //     <button onClick={handleBack}>back</button>
    //   </footer>
    // </div>
    <div className="profile-container">
  <h1 className="profile-title">Profile</h1>
  {userData && (
    <div className="profile-content">
      <p className="profile-username">Username: {userData.username}</p>
      <p className="profile-profession">Profession: {userData.proffession}</p>
      <p className="profile-photos">Photos:</p>
      <div className="photo-grid">
        {userData.photoURLs.map((photo, index) => (
          <image
            key={index}
            src={photo}
            className="profile-photo"
            alt={`Photo ${index}`}
          />
        ))}
      </div>
    </div>
  )}
  <footer>
    <button className="back-button" onClick={handleBack}>Back</button>
  </footer>
</div>

  );
}

export default SearchProfile;
