import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, isAuth, signout, updateUser } from '../auth/helpers';

const Private = ({ history }) => {

    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token')

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Profile Update', response);
                const { role, name, email } = response.data;

                setValues({ ...values, role, name, email })

            })
            .catch(error => {
                console.log('Private profile update error', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/')
                    })
                }
            })
    }
    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        console.log((event.target.value));

        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'submitting' })
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('Private Profile successfully Updated', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' })
                    toast.success('Profile Updated successfully')
                });

            })
            .catch(error => {
                console.log('Private Profile update error', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })
    }

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted"> Role</label>
                <input type="text" defaultValue={role} className="form-control" disabled />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted"> Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted"> Email</label>
                <input type="email" defaultValue={email} className="form-control" disabled />
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

                <h1 className="pt-5 text-center">Private</h1>
                <p className="lead text-center">Profile Update</p>
                {updateForm()}
            </div>
        </Layout>
    )
}

export default Private;
