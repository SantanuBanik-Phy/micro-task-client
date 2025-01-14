import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = (googleProvider) => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
   

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

 
    const fetchUserCoins = async (email) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/users/coins?email=${email}`
          );
          return response.data.coins;
        } catch (error) {
          console.error("Error fetching user coins:", error);
          return 0; // Default to 0 coins if fetching fails
        }
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const coins = await fetchUserCoins(currentUser.email);
            setUser({ ...currentUser, coins });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, []);
    
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUser,
        setUser,
        fetchUserCoins
       
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;