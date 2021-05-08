import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RedirectRoute({ component: Component, ...other_props }) {

    const { currentUser } = useAuth();

    return (
        <Route
            {...other_props}
            render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }} >
        </Route>
    );
}