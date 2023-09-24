import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import { useParams } from 'react-router-dom';
import {getDoc,doc, collection, query, where} from "firebase/firestore"; 
import { storage, auth ,firestore} from "../firebase";

 function  SearchProfile() {
  const { uid } = useParams(); // Access the UID from route parameters
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  // const docRef = doc(firestore, "users", uid);
  // const docSnap =  getDoc(docRef);

  const handleBack=(e)=>{
    e.preventDefault();
    navigate('/Profile')
  }

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  // Fetch user data based on the UID
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
    // Replace with your logic to fetch user data based on the UID
    // Example:
    // fetchDataByUID(uid).then((data) => {
    //   setUserData(data);
    // });
  }, [uid]);

  return (
    <div>
      <h1> Profile</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>proffession: {userData.proffession}</p>

          
          {/* <img src={userData.photoURLs}  alt="Profile Picture" /> */}
          <p>Photos:</p>
              {userData.photoURLs.map((photo, index) => (
                <img key={index} src={photo} 
                style={{width: "192px", height: "192px"}}
                alt={`Photo ${index}`} />))}
          {/* Add more fields as needed */}
        </div>
      )}
     
      {/* Display user profile data */}
      {/* Replace with your logic to display user data */}
      <br/>
            <br/>

      <footer>
        <button onClick={handleBack}>back</button>
      </footer>
    </div>
  );
}

export default SearchProfile;
