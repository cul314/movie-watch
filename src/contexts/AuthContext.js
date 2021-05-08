import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// Learned About using React Contexts from Youtube channel: Web Dev Simplified

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signIn = function(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const createUser = function(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const signOut = function() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);
    

    const value = {
        currentUser,
        signIn,
        createUser,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}