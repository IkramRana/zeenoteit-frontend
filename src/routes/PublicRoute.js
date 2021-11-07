import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from 'hooks/useAuth';

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