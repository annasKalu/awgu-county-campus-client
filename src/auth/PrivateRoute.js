import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';


const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }} />
                )
        }>

    </Route>
)


export default PrivateRoute;

// the above is used to make sure that only signed in users can access the user profile page.
