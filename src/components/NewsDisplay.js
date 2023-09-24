// NewsDisplay.js

import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function NewsDisplay() {
  const user = auth.currentUser;
  const currentUserid = user.uid;
  const [newsData, setNewsData] = useState([]);

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
  }, [currentUserid]);

  return (
    <div>
      <h2>Your News Feed</h2>
      <ul>
        {newsData.map((newsItem, index) => (
          <li key={index}>{newsItem.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewsDisplay;
