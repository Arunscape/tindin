import React from 'react';
import { Route as R, Redirect } from 'react-router-dom';

const authenticated = () => Boolean(localStorage.getItem('userToken'))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <R
        {...rest}
        render={props =>
            authenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/signin"
                        }}
                    />
                )
        }
    />
);

const Route = ({ component: Component, ...rest }) => (
    <R
        {...rest}
        render={props =>
            authenticated() ? (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            ) : (
                    <Component {...props} />
                )
        }
    />
);
export { PrivateRoute, Route };