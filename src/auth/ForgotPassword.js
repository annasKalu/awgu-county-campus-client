import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const ForgotPassword = ({ history }) => {

    const [values, setValues] = useState({
        email: '',
        buttonText: 'Request Reset Link'
    });

    const { email, buttonText } = values;

    const handleChange = name => event => {
        console.log((event.target.value));

        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'submitting' })
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('Forgot Password  reset');
                toast.success(response.data.message)
                setValues({ ...values, buttonText: 'Request sent' })


            })
            .catch(error => {
                console.log('Forgot Password error', error.response.data);
                setValues({ ...values, buttonText: 'Request Reset Link' })
                toast.error(error.response.data.error)
            })
    }

    const passwordForgotForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
            </div>

            <div className="btn btn-primary" onClick={clickSubmit}>{buttonText}</div>
        </form>
    )
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />

                <h1 className="p-5 text-center">Forgot Password</h1>
                {passwordForgotForm()}
            </div>
        </Layout>
    )
}

export default ForgotPassword;
