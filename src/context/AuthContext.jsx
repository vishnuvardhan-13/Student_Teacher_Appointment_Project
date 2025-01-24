import React, { createContext, useContext, useEffect, useState } from "react"; 
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);

                // Fetch the user's role from Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setRole(userDoc.data().role); // Assumes role is a field in the Firestore document
                } else {
                    console.error("No user role found in Firestore.");
                    setRole(null);
                }
            } else {
                setCurrentUser(null);
                setRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email, password) => {
        // Ensure the promise is returned
        return signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email, password, role) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save the role in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role,
        });
    };

    const logout = () => signOut(auth);

    const value = { currentUser, role, login, register, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
