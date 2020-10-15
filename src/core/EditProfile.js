import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, isAuth, signout, updateUser } from '../auth/helpers';

import { Button, TextField } from '@material-ui/core';
import { DialogActions, Dialog, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { makeStyles } from '@material-ui/core/styles';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}


const EditProfile = ({ history, match }) => {
    const classes = useStyles()


    const [open, setOpen] = React.useState(false);

    const isActive = path => {
        if (match.path === path) {
            return { color: '#ff4081' }
        } else {
            return { color: '#262626' }
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                console.log('Admin profile update error', error.response.data.error);
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
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('Admin Profile successfully Updated', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' })
                    toast.success('Profile Updated successfully')
                });

            })
            .catch(error => {
                console.log('Admin Profile update error', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' })
                toast.error(error.response.data.error)
            })
    }

    const updateForm = () => (
        <form>

            <Button className={classes.updateButton} onClick={handleClickOpen} size="large" variant='contained' fullWidth>
                Update Profile
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Update Your Profile
        </DialogTitle>
                <DialogContent>
                    <TextField
                        id="role"
                        type="text"
                        label="Role"
                        className={classes.textField}
                        defaultValue={role}
                        margin="normal"
                        disabled
                    /><br />

                    <TextField
                        id="name"
                        type="text"
                        label="Name"
                        className={classes.textField}
                        value={name}
                        onChange={handleChange('name')}
                        margin="normal"
                    /><br />
                    <TextField
                        id="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        defaultValue={email}
                        margin="normal"
                        disabled
                    /><br />

                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        onChange={handleChange('password')}
                        margin="normal"

                    />
                    <br />

                </DialogContent>

                <DialogActions>
                    <Button onClick={clickSubmit} color="primary">
                        {buttonText}
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                </DialogActions>

                {/* <div className="form-group">
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

            <div className="btn btn-primary" onClick={clickSubmit}>{buttonText}</div> */}
            </Dialog>
        </form>
    )
    return (

        <div className="col-md-6 offset-md-3">
            <ToastContainer />

            {updateForm()}
        </div>


    )
}

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    lineDivider: {
        backgroundColor: '#003400',
        height: '0.50rem',
    },
    title: {
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
        textAlign: 'center',
        color: '#004d00',
        fontWeight: 'bold',
        marginTop: 0,
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    secondary: {
        color: '#ab003c',
        backgroundColor: '#ff7961',
        fontWeight: 'bold',
    },
    primary: {
        backgroundColor: '#004d00',
        fontWeight: 'bold',
        color: '#fff'
    },
    updateButton: {

        color: '#fff',
        backgroundColor: '#78ab78',
        display: 'block',
        '&:hover': {
            backgroundColor: '#006200',
            color: '#ff1414',
            border: '0',
            fontWeight: 'bold'


        },

        "&:focus": {
            outline: 'none !important',


        }
    }
}))

export default EditProfile;
