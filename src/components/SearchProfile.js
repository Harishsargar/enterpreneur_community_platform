import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SearchProfile() {
  const { uid } = useParams(); // Access the UID from route parameters
  const [userData, setUserData] = useState(null);

  // Fetch user data based on the UID
  useEffect(() => {
    console.log(uid)
    // Replace with your logic to fetch user data based on the UID
    // Example:
    // fetchDataByUID(uid).then((data) => {
    //   setUserData(data);
    // });
  }, [uid]);

  return (
    <div>
      <h1> Profile</h1>
      <p>User UID: {uid}</p>
      {/* Display user profile data */}
      {/* Replace with your logic to display user data */}
    </div>
  );
}

export default SearchProfile;
