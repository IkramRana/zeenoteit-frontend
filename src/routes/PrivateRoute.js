import useAuth from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route } from 'react-router';

export default function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    console.log('file: PrivateRoute.js => line 7 => PrivateRoute => auth', auth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};