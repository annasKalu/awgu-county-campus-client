import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import TextField from '@material-ui/core/TextField';
import { Icon, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { authenticate, isAuth } from '../auth/helpers';
import AdminSignin from './SigninAdmin';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = ({ history }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { email, password, buttonText } = values;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {

    setValues({ ...values, [name]: event.target.value })
  }

  const onClickLogin = () => {
    if (email === "admin20@gmail.com" && password === "1234567") {
      console.log('onClickLogin Called');
    }
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
          isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')

        });

      })
      .catch(error => {
        console.log('signin error', error.response.data);
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }

  return (
    <div>
      {isAuth() ? <Redirect to="/admin" /> : null}
      <Button onClick={handleClickOpen}>
        Admin Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" className={classes.title}>
          Sign In As An Administrator
        </DialogTitle>
        <Divider className={classes.lineDivider} />
        {/*  */}
        <DialogContent>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange('email')}
            margin="normal"
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
          <Button onClick={clickSubmit} variant="contained" className={classes.primary}>
            {buttonText}
          </Button>
          <Button onClick={handleClose} variant="contained" className={classes.secondary}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// 
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
  }
}))

// 

export default DraggableDialog;
