import useAuth from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route } from 'react-router';

export default function PublicRoute({ children, ...rest }) {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/my-missions",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};