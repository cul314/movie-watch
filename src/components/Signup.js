import './App.css';
import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {

    const { createUser } = useAuth();
    const email_ref = useRef();
    const pass_ref = useRef();
    const confirm_pass_ref = useRef();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async function(event) {
        event.preventDefault();

        if (pass_ref.current.value !== confirm_pass_ref.current.value) {
            alert("Passwords are not the same.");
            return;
        }

        try {
            setLoading(true);
            await createUser(email_ref.current.value, pass_ref.current.value);
            history.push("/");
        } catch (error) {
            alert("Unable to create account. " + error.message);
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="login-component">
                <h1>Sign Up</h1>
                <form autoComplete="off" onSubmit={handleSubmit} >
                    <div className="control">
                        <h2>Email</h2>
                        <input className="input" type="email" required placeholder="john@example.com" ref={email_ref}/>
                    </div>
                    <div className="control">
                        <h2>Password</h2>
                        <input className="input" type="password" required placeholder="password" ref={pass_ref}/>
                    </div>
                    <div>
                        <h2>Password Confirmation</h2>
                        <input className="input" type="password" required placeholder="confirm password" ref={confirm_pass_ref} />
                    </div>
                    <div className="control">
                        <input className="button is-info is-fullwidth" type="submit" disabled={loading} value="Create Account" />
                    </div>
                </form>
                
            </div>
            <h3 style={{ textAlign: "center", marginTop: "10px", color: "gray" }}>Already have an accout? Sign in <Link to="/login">here</Link></h3>
        </div>
    );
}