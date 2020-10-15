import React from 'react';
import { Divider } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';

import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, signout } from '../auth/helpers';

import ButtonMenuCollapse from './ButtonMenuCollapse';

// const isActive = (history, path) => {
//     if (history.location.pathname == path)
//         return { color: '#ff4081' }
//     else
//         return { color: '#262626' }
// }

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        left: 0,
    },
    buttonBar: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        margin: '10px',
        paddingLeft: '16px',
        left: 0,
        position: 'relative',
        width: '100%',
        background: 'transparent',
    },
}));

const MenuCollapse = withRouter(({ props, match, history }) => {
    const classes = useStyles();

    const isActive = path => {
        if (match.path === path) {
            return { color: '#ff4081' }
        } else {
            return { color: '#262626' }
        }
    }
    return (

        <div className={classes.root}>

            <ButtonMenuCollapse>


                <Link to="/">
                    <IconButton aria-label="Home" style={isActive("/")}>
                        <HomeIcon />
                    </IconButton>
                </Link>

                <Divider />
                <Link to="/about" color="secondary">
                    <Button style={isActive("/about")} >
                        About Us
                    </Button>
                </Link>

                <Divider />

                <Link to="/admins" color="secondary">
                    <Button style={isActive("/admins")} >
                        Admin Page
                    </Button>
                </Link>

                <Divider />

                <Link to="/academics" color="secondary">
                    <Button style={isActive("/academics")}>
                        Academics
                        </Button>
                </Link>

                <Divider />

                <Link to="/students" color="secondary">
                    <Button style={isActive("/students")} >Students </Button>
                </Link>
                <Divider />
                <Link to="/contact" color="secondary">
                    <Button style={isActive("/contact")} >Contact Us </Button>
                </Link>
                <Divider />

                <Link to="/users" color="secondary">
                    <Button style={isActive("/users")} >Users</Button>
                </Link>
                {
                    !isAuth() && (<span>
                        <Link to="/signup">
                            <Button style={isActive("/signup")}>
                                Sign up
                                </Button>
                        </Link>
                        <Link to="/signin">
                            <Button style={isActive("/signin")}>
                                Sign In
                                </Button>
                        </Link>
                    </span>)
                }
                {
                    isAuth() && (<span>
                        <Link to={"/user/" + isAuth().user}>
                            <Button style={isActive("/user/" + isAuth().user)}>
                                My Profile
                                </Button>
                        </Link>
                        <Button className="nav-link"
                            style={{ cursor: 'pointer', color: '#ff1414' }}
                            onClick={() => {
                                signout(() => {
                                    history.push('/')
                                })
                            }}>Signout
                                </Button>
                    </span>)
                }

            </ButtonMenuCollapse>


        </div>
    );
});


export default MenuCollapse
