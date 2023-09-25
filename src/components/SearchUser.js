import React, { useState } from 'react'
import {getDocs, collection, query, where} from "firebase/firestore"; 
import { storage, auth ,firestore} from "../firebase";
import { Link } from "react-router-dom";
import '../css/SearchUser.css'


function SearchUser() {

    const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
        console.log('searching........')
      // Create a query to search for users with a matching 'username'
      const usersCollection = collection(firestore, 'users');
      const userQuery = query(usersCollection, where('username', '==', searchQuery));
        
      // Perform the search by fetching the documents that match the query
      const querySnapshot = await getDocs(userQuery);
      
      // Process the search results
    const results = [];
    querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const uid = doc.id; // Retrieve the UID from the document ID
    const userWithUid = { ...userData, uid }; // Include UID in the user data
    results.push(userWithUid);
    });

      // Update state with search results
      setSearchResults(results);

      console.log(searchResults)
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  return (
    <div>
       <div>
      {/* <h1>User Search</h1> */}
      {/* <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}
       <div class="search-container">
        <input type="text" class="search-input" placeholder="Search..." 
         value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        <button class="search-button" onClick={handleSearch}>Search</button>
    </div>
      {/* <button onClick={handleSearch}>Search</button> */}
      <ul>
        {searchResults.map((user, index) => (
        //   <li key={index}>{user.username}</li>
        <Link to={`/profile/${user.uid}`}>{user.username}</Link>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default SearchUser
