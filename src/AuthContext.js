import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from './firebase'; // Replace with your Firebase authentication setup
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

// Create an authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// Authentication context provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Listen for authentication state changes using Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      
      setCurrentUser(user);
      console.log(user)
      
      
    });

    return unsubscribe; // Unsubscribe when component unmounts
  }, []);



  // Function to register a new user
  async function register(email, password,username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // After user creation, update the user's display name with the username
        await updateProfile(userCredential.user, {
          displayName: username,
        });

        return userCredential.user;
      } catch (error) {
        throw error;
      };
    
  }

  // async function register2(email ,username){
  //   console.log(currentUser.uid)
  //   const docRef = await addDoc(collection(firestore, "users",currentUser.uid), {
  //       username,
  //       email
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  // }

  // Function to log in an existing user
  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  // Function to log out the current user
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
