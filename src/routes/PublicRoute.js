import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from 'hooks/useAuth';

export default function PublicRoute({ children, ...rest }) {

    let auth = useAuth();
    console.log('file: PublicRoute.js => line 8 => PublicRoute => auth', auth?.plan)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: auth?.plan ? "/my-missions" : "/payment",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};