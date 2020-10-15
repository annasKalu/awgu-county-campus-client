import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { authenticate, isAuth } from '../auth/helpers';
import Google from '../auth/Google';
import Facebook from '../auth/Facebook';

const AdminSignin = ({ history }) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        console.log((event.target.value));

        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/dashboard') : history.push('/private')

        });
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('Signin was successful');

                // save the response(user, token) in localStorage/cookie
                authenticate(response, () => {

                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' })
                    toast.success(`Hello ${response.data.user.name}, welcome back!`)
                    isAuth() && isAuth().role === 'admin' ? history.push('/dashboard') : history.push('/private')

                });

            })
            .catch(error => {
                console.log('signin error', error.response.data);
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })
    }

    const signinForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted"> Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>

            <div className="btn btn-primary btn-lg btn-block" onClick={clickSubmit}>{buttonText}</div>
        </form>
    )
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />

                {isAuth() ? <Redirect to="/" /> : null} {/*using isAuth() to redirect a user after the user has signed in */}

                <h1 className="p-5 text-center">Sign In</h1>
                <Google informParent={informParent} />
                <Facebook informParent={informParent} />
                {signinForm()}
                <br />

                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    )
}

export default AdminSignin;
