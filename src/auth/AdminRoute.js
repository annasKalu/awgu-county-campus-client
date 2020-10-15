import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helpers';


const AdminRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isAuth() && isAuth().role === 'admin' ? (
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


export default AdminRoute;

// the above is used to make sure that only a user who has the role of an admin can access the admin page.

