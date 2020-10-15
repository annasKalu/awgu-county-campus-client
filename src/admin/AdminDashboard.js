import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth } from './helpers';

const Signup = () => {

    const [values, setValues] = useState({
        name: 'Annas',
        email: 'kalu.annas@yahoo.com',
        password: '202020',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        console.log((event.target.value));

        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'submitting' })
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('Signup was successful', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' })
                toast.success(response.data.message)
            })
            .catch(error => {
                console.log('signup error', error.response.data);
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted"> Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted"> Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted"> Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>

            <div className="btn btn-primary" onClick={clickSubmit}>{buttonText}</div>
        </form>
    )
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />

                {isAuth() ? <Redirect to="/" /> : null} {/*using isAuth() to redirect a user after the user has signed in */}
                <h1 className="p-5 text-center">Sign Up</h1>
                {signupForm()}
                <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    )
}

export default Signup;
