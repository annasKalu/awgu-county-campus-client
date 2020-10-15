import React from 'react';
import { BrowserRouter as MyRouter, Switch, Route } from 'react-router-dom';

import AboutUs from './aboutUs/AboutUs';

import App from './App';
import Activate from './auth/Activate';
import AdminRoute from './auth/AdminRoute';
import ForgotPassword from './auth/ForgotPassword';
import PrivateRoute from './auth/PrivateRoute';
import ResetPassword from './auth/ResetPassword';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Admin from './core/Admin';
import Private from './core/Private';






const MainRouter = () => {
    return (
        <MyRouter>
            <Switch>

                <Route path="/" exact component={App} />
                <Route path="/about" exact component={AboutUs} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <PrivateRoute path="/private" exact component={Private} />
                <AdminRoute path="/admin" exact component={Admin} />
                {/* <AdminRoute path="/admin" exact component={AdminDashboard} /> */}

                <Route path="/auth/password/forgot" exact component={ForgotPassword} />
                <Route path="/auth/password/reset/:token" exact component={ResetPassword} />
                {/* <Route path="/auth/admin/signup" exact component={Signup} /> */}
            </Switch>
        </MyRouter>
    )
}

export default MainRouter;
