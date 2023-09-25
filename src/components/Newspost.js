import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import { collection, addDoc,doc,updateDoc ,getDoc , serverTimestamp } from 'firebase/firestore';
import NewsList from './NewsDisplay';
import { v4 as uuidv4 } from 'uuid';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject, // Import deleteObject function
} from "firebase/storage";
import '../css/Newspost.css'

const Newspost = () => {
  const user = auth.currentUser;
  const currentUserid = user.uid;
  const [newsText, setNewsText] = useState('');
  const [newsData, setNewsData] = useState([])

  

  const handleNewsTextChange = (e) => {
    setNewsText(e.target.value);
  };

  const handlePostNews = async () => {
    try {
      const newsId = uuidv4(); // Generate a unique ID for the news item
  
      // Create a reference to the user's document within the 'users' collection
      const userDocRef = doc(firestore, 'users', currentUserid);
  
      // Get the existing user document data
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data() || {};
  
      // Check if 'news' field exists in user data
      if (!userData.news) {
        userData.news = []; // Initialize the 'news' field as an array if it doesn't exist
      }
  
      // Add the news to the user's data along with the newsId
      userData.news.push({
        id: newsId, // Assign a unique ID to the news item
        text: newsText,
        timestamp: new Date().toISOString(),
      });
  
      // Update the user's document with the new news data
      await updateDoc(userDocRef, userData);
  
      console.log('Posted news:', newsText);
  
      // Clear the text area after posting
      setNewsText('');
    } catch (error) {
      console.error('Error posting news:', error);
    }
  };
  useEffect(() => {
    // Create a reference to the user's document within the 'users' collection
    const userDocRef = doc(firestore, 'users', currentUserid);

    // Fetch the user's document data
    const fetchNews = async () => {
      try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() || {};
          const userNews = userData.news || [];
          setNewsData(userNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [handlePostNews]);



  const handleDeleteNews = async (newsId) => {
    // // if (!user) {
    // //   return console.log("User not found");
    // // }
    // console.log("deletting the img !!");
    // // Delete the image from Firebase Storage
    // deleteObject(newsId)
    //   .then(() => {
    //     // Remove the deleted image from the state
    //     // setImageUrls((prev) => prev.filter((img) => img.item !== item));
    //     console.log("deleted !!!!!!!!");
    //     // setImageCount((count) => count - 1); // Decrement the image count

    //   })
    //   .catch((error) => {
    //     console.error("Error deleting image:", error);
    //   });
    try {
      // Create a reference to the user's document within the 'users' collection
      const userDocRef = doc(firestore, 'users', currentUserid);
  
      // Get the existing user document data
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data() || {};
  
      // Check if 'news' field exists in user data
      if (userData.news) {
        // Filter out the news item with the specified ID
        userData.news = userData.news.filter((newsItem) => newsItem.id !== newsId);
  
        // Update the user's document without the deleted news item
        await updateDoc(userDocRef, userData);
  
        console.log('Deleted news with ID:', newsId);
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };
  

  return (
    <div >
      <section id="newsPosting">
      <h3>Post News</h3>
      <textarea
        placeholder="Enter your news update..."
        value={newsText}
        onChange={handleNewsTextChange}
        rows="5"
        style={{width: "450px"}}
        
      /><br/>
      <button   class="search-button" onClick={handlePostNews}>Post</button>
      </section>
      <ul>
        {newsData.slice().reverse().map((newsItem, index) => (
          <li key={index}>
            <div className="note-item">
              <div className="note-text">
              {newsItem.text}
              </div>
              <div className="delete-button"><button onClick={() => handleDeleteNews(newsItem.id)}>Delete</button></div>
            </div>
            
          </li>
        ))}
      </ul>
      {/* <NewsList/> */}
    </div>
  );
};

export default Newspost;
