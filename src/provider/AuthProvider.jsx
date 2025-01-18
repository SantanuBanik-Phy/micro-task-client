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
          return 0; // Default to 0 coins if fetching fails
        }
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
    
            if (currentUser?.email) {
                try {
                    // Generate JWT token
                    const user = { email: currentUser.email };
                    const response = await axios.post(
                        'https://b10-a12-server.vercel.app/jwt',
                        user,
                        { withCredentials: true }
                    );
    
                    const token = response.data.token;
    
                    // Save the token to localStorage as a fallback
                    localStorage.setItem('jwtToken', token);
    
                    // Fetch user coins using email
                    const coins = await fetchUserCoins(currentUser.email);
                    setUser({ ...currentUser, coins });
                } catch (error) {
                    console.error("Error generating JWT or fetching coins:", error);
                    setUser(null);
                }
            } else {
                try {
                    // Clear localStorage token on logout
                    localStorage.removeItem('jwtToken');
                    await axios.post(
                        'https://b10-a12-server.vercel.app/logout',
                        {},
                        { withCredentials: true }
                    );
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