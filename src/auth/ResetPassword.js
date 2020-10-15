import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const ResetPassword = ({ match }) => { // props.match from react router dom

    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset Password'
    });

    useEffect(() => {
        let token = match.params.token
        let { name } = jwt.decode(token)
        if (token) {
            setValues({ ...values, name, token })
        }
    }, [])

    const { name, token, newPassword, buttonText } = values;

    const handleChange = event => {
        console.log((event.target.value));

        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Resetting ...' })
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token }
        })
            .then(response => {
                console.log('Reset Password  success', response);
                toast.success(response.data.message)
                setValues({ ...values, buttonText: 'Password Changed' })


            })
            .catch(error => {
                console.log('Reset Password error', error.response.data);
                setValues({ ...values, buttonText: 'Reset Password' })
                toast.error(error.response.data.error)
            })
    }

    const resetPasswordForm = () => (
        <form>

            <div className="form-group">
                <label className="text-muted"> Email</label>
                <input onChange={handleChange} type="password"
                    value={newPassword} className="form-control"
                    placeholder="Enter New Password"
                    required
                />
            </div>

            <div className="btn btn-primary" onClick={clickSubmit}>{buttonText}</div>
        </form>
    )
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />

                <h2 className="p-5 text-center">Hello {name} enter your new password</h2>
                {resetPasswordForm()}
            </div>
        </Layout>
    )
}

export default ResetPassword;
