import './App.css';
import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {

    const { signIn, currentUser } = useAuth();
    const email_ref = useRef();
    const pass_ref = useRef();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async function(event) {
        event.preventDefault();

        try {
            setLoading(true);
            await signIn(email_ref.current.value, pass_ref.current.value);
            history.push("/");
            console.log(currentUser);
        } catch (error) {
            alert("Unable to sign in. " + error.message);
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="login-component">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="control">
                        <h2>Email</h2>
                        <input className="input" type="email" required placeholder="john@example.com" ref={email_ref}/>
                    </div>
                    <div className="control">
                        <h2>Password</h2>
                        <input className="input" type="password" required placeholder="password" ref={pass_ref}/>
                    </div>
                    <div className="control">
                        <input className="button is-info is-fullwidth" type="submit" disabled={loading} value="Sign In" />
                    </div>
                </form>
                
            </div>
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Don't have an accout? Sign up <Link to="/signup">here</Link></h3>
        </div>
    );
}