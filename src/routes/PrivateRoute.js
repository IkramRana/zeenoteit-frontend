import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from 'hooks/useAuth';

export default function PrivateRoute({ children, ...rest }) {

    let auth = useAuth();

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