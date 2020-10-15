import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, updateUser } from '../auth/helpers';
import EditProfile from './EditProfile';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, TextField, Button } from '@material-ui/core';
import { Paper, Grid, Divider } from '@material-ui/core';





const Admin = ({ history, match }) => {

    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
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
            <div style={{ marginBottom: '0.7rem' }}>
                <TextField label="Name" onChange={handleChange('name')} type="text" value={name} className={classes.inputField} fullWidth />


                <TextField label="Email" onChange={handleChange('email')} type="email" value={email} className={classes.inputField} fullWidth />


                <TextField label="Password" onChange={handleChange('password')} type="password" value={password} className={classes.inputField} fullWidth />
            </div>

            <Button className={classes.primary} onClick={clickSubmit} size="large" variant="contained" fullWidth>
                {buttonText}
            </Button>
        </form>
    )
    return (
        <div style={{ background: '#ebebeb' }}>
            <Layout>

                <Paper elevation={3} className={classes.card}>
                    <div className={classes.root}>
                        <ToastContainer />
                        {isAuth() ? <Redirect to="/admin" /> : null} {/*using isAuth() to redirect a user after the user has signed in */}
                        <h1 className={classes.title}>Administrator's Page</h1>
                        <Divider className={classes.lineDivider} />
                        <Grid container spacing={2} className={classes.gridMain}>
                            <Grid item xs>
                                <Paper className={classes.paper}>
                                    <h2 className={classes.leadText}>Add an Employee</h2>
                                    {signupForm()}
                                </Paper>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs>
                                <Paper className={classes.paper}>
                                    <h2 className={classes.leadText}>List of Existing Employees</h2>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/*  */}
                        <EditProfile />

                        {/*  */}

                    </div>

                </Paper>

            </Layout>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#f5f5f5'
    },
    card: {
        minWidth: '95%',
        marginLeft: 'auto',
        padding: '7px',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: '#004d00',
        textAlign: "center",
        margin: '0',
        padding: '2px',
        fontWeight: 'bold',

    },
    lineDivider: {
        backgroundColor: '#003400',
        height: '0.50rem',
        marginBottom: '2px'
    },
    gridMain: {
        marginBottom: '0.5rem'
    },
    primary: {
        backgroundColor: '#004d00',
        fontWeight: 'bold',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#3b453b',
        },
        '&:focus': {
            outline: 'none'
        }
    },
    leadText: {
        color: '#004d00',
        fontWeight: 'bold',
    },
    inputField: {
        borderBottom: '3px solid #004d00',
        outline: '2px solid transparent',
        '&:hover': {
            outline: '1px solid transparent',
            borderBottom: '3px solid #004d00 !important',
        },
        '&:focus': {
            outline: '1px solid transparent',
            borderBottom: '3px solid #004d00 !important',
        }
    },
}));
export default Admin;
