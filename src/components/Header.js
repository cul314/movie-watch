import React from 'react';
import './App.css';
import { useAuth } from '../contexts/AuthContext';


export default function Header() {

    const { currentUser, signOut } = useAuth();

    let userInfo = <div></div>;

    const handleSignOut = async function() {
        try {
            await signOut();
        } catch(error) {
            console.log("Unable to sign out. " + error.message);
        }
    }

    if (currentUser) {
        userInfo = <div className="userInfo">
            <h3>{currentUser.email}&emsp;<span onClick={handleSignOut} style={{ cursor: "pointer", textDecoration: "underline" }} >Log Out</span></h3>
            
        </div>;
    } else {
        userInfo = <div className="userInfo">
            <h3>Not logged in</h3>
        </div>;
    }

    return (
        <div className="header">
            <div className="title">
                <h1>Where to Watch</h1>
            </div>
            {userInfo}
        </div>
    );
}