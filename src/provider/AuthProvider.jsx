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
            `https://b10-a12-server.vercel.app/api/users/coins?email=${email}`
          );
          return response.data.coins;
        } catch (error) {
          console.error("Error fetching user coins:", error);
          return 0; 
        }
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
    
            if (currentUser?.email) {
                try {
                    // Generate JWT token
                    const userInfo = { email: currentUser.email };
                    const response = await axios.post('https://b10-a12-server.vercel.app/jwt', userInfo);
    
                    // Store token in localStorage
                    if (response.data.token) {
                        const token = response.data.token;
                        localStorage.setItem('access-token', token);
                        // console.log("Token set in localStorage:", token);
    
                        // Fetch user coins using email
                        const coins = await fetchUserCoins(currentUser.email);
    
                        // Set the user with coins in state
                        setUser({ ...currentUser, coins });
                    }
                } catch (error) {
                    console.error("Error generating JWT or fetching coins:", error);
                    setUser(null);
                }
            } else {
                try {
                    // Clear token from localStorage on logout
                    localStorage.removeItem('access-token');
                    // console.log("Token removed from localStorage");
                } catch (error) {
                    console.error("Error during logout:", error);
                } finally {
                    setUser(null);
                }
            }
    
            setLoading(false);
        });
    
        return () => {
            unsubscribe();
        };
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