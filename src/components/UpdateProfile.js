import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { storage, auth, firestore } from '../firebase';

function UpdateProfile() {
  const user = auth.currentUser;
  const currentUserid = user.uid;
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [proffession, setProffession] = useState('');

  useEffect(() => {
    // Fetch the current user's profile data from Firestore and populate the input fields
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, 'users', currentUserid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username || ''); // Populate username (use an empty string if null)
          setProffession(userData.proffession || ''); // Populate proffession (use an empty string if null)
        } else {
          // Document doesn't exist, create it
          const userData = {
            // Define the initial data you want to set
            // For example, you can set default values for username and proffession
            username: user.displayName,
            proffession: 'Update Profession',
          };

          // Create the document with the initial data
          await setDoc(doc(firestore, 'users', currentUserid), userData);

          // Populate the input fields with the default values
          setUsername(userData.username);
          setProffession(userData.proffession);
        }
      } catch (error) {
        console.error('Error fetching/updating user profile:', error);
      }
    };

    fetchUserProfile();
  }, [currentUserid]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const userRef = doc(firestore, 'users', currentUserid);
    const updateData = {
      username: username,
      proffession: proffession,
    };

    try {
      await setDoc(userRef, updateData); // Use setDoc to update the document
      console.log('Document successfully updated!');
      // Optionally, show a success toast message to the user
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
      // Show an error toast message to the user
      toast.error('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h1>Enterpreneur Community Platform</h1>
      <ToastContainer />
      <h2>Update Profile</h2>
      <form>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label>Proffession</label>
          <br />
          <input
            type="text"
            className="form-control"
            value={proffession}
            onChange={(e) => setProffession(e.target.value)}
          />
        </p>
        <p>
          <button id="sub_btn" onClick={handleUpdateProfile}>
            Update
          </button>
        </p>
      </form>
      <footer>
        <button id="sub_btn" onClick={() => navigate('/Profile')}>
          Back
        </button>
      </footer>
    </div>
  );
}

export default UpdateProfile;
