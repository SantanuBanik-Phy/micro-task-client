import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';


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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    // Fetch the coin balance from the database
                    const response = await fetch(`http://localhost:3000/api/users/coins?email=${currentUser.email}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
    
                    if (response.ok) {
                        // Update the user object with coin balance
                        setUser({ ...currentUser, coins: data.coins });
                    } else {
                        console.error("Failed to fetch user coins:", data.error);
                    }
                } catch (error) {
                    console.error("Error fetching user coins:", error);
                }
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
       
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;