import React, { Fragment, useState, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';
import Footer from '../core/Footer'

import AppBar from '@material-ui/core/AppBar'
import { Toolbar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import MenuCollapse from './MenuCollapse';


const Layout = ({ children, match, history }) => {

    const isActive = path => {
        if (match.path === path) {
            return { color: '#ff4081' }
        } else {
            return { color: '#262626' }
        }
    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const todaysDate = new Date().toDateString();

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleTogClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const nav = () => (

        <AppBar position="sticky" color="inherit">
            <div className={classes.titleDiv}>
                <div className={classes.nameTitle}>
                    <Toolbar>
                        <Typography variant="h6" >
                            <p className={classes.dateLine}>Today is - {todaysDate}</p>
                            <span className={classes.schoolName}>Awgu High School - Nenwe</span>
                        </Typography>
                    </Toolbar>
                </div>
            </div>
            <div className={classes.menuContent}>
                <Toolbar className={classes.menuItems}>
                    <MenuCollapse />
                    <div className={classes.menuCollapse}>

                        <Link to="/">
                            <IconButton aria-label="Home" style={isActive("/")}>
                                <HomeIcon />
                            </IconButton>
                        </Link>

                        <span>||</span>
                        <Link to="/about" color="secondary">
                            <Button style={isActive("/about")} >
                                About Us
                            </Button>
                        </Link>

                        <span>||</span>

                        <Link to="/staffs" color="secondary">
                            <Button style={isActive("/staffs")} >
                                Staff List
                            </Button>
                        </Link>

                        <span>||</span>

                        <Link to="/academics" color="secondary">
                            <Button style={isActive("/academics")}>
                                Academics
                            </Button>
                        </Link>

                        <span>||</span>

                        <Link to="/students" color="secondary">
                            <Button style={isActive("/students")} >Students </Button>
                        </Link>
                        <span>||</span>
                        <Link to="/contact" color="secondary">
                            <Button style={isActive("/contact")} >Contact Us </Button>
                        </Link>
                        <span>||</span>

                        <Link to="/users" color="secondary">
                            <Button style={isActive("/users")} >Users</Button>
                        </Link>
                        {
                            !isAuth() && (<span>
                                <Link to="/signup">
                                    <Button style={isActive("/signup")}> Sign up</Button>

                                </Link>
                                <Link to="/signin">
                                    <Button style={isActive("/signin")}>Sign In </Button>
                                </Link>
                            </span>)
                        }


                        { // showing the signout link on the menu when signed in and redirecting a user to the home page once the user is signed out
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


                        {isAuth() && isAuth.role === 'admin' && (<span>
                            <Fragment className="nav-item" >
                                <Link to="/admin" className="nav-link" style={isActive('/admin')}>
                                    {isAuth().name}
                                </Link>
                            </Fragment>
                        </span>)
                        }
                        {/* showing a user's name on the home page once the user is signed in. When clicked will redirect based on role */
                            isAuth() && isAuth.role === 'subscriber' && (
                                <Fragment className="nav-item">
                                    <Link to="/private" className="nav-link" style={isActive('/private')}>
                                        {isAuth().name}
                                    </Link>
                                </Fragment>
                            )
                        }
                        {/* ??????? */}



                        {/* {
                            auth.isAuthenticated() && (<span>
                                <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                    <Button style={isActive("/user/" + auth.isAuthenticated().user._id)}>
                                        My Profile
                                    </Button>
                                </Link>
                                <Button className={classes.navContent} color="inherit" onClick={() => {
                                    auth.clearJWT(() => history.push('/'))
                                }}>
                                    Sign out
                                </Button>
                            </span>)
                        } */}
                    </div>

                </Toolbar>
            </div>
        </AppBar>
        // ########################################

        // <ul className="nav nav-tabs bg-primary">
        //     <li className="nav-item">
        //         <Link to="/" className="nav-link" style={isActive('/')}>
        //             Home
        //         </Link>
        //     </li>
        //     <li className="nav-item">
        //         <Link to="/about" className="nav-link" style={isActive('/about')}>
        //             ABOUT US
        //         </Link>
        //     </li>

        //     {//hiding the signin and signup link from the menu once a user is signed in.
        //         !isAuth() && (
        //             <Fragment>
        //                 <li className="nav-item">
        //                     <Link to="/signin" className="nav-link" style={isActive('/signin')}>
        //                         Signin
        //                     </Link>
        //                 </li>

        //                 <li className="nav-item">
        //                     <Link to="/signup" className="nav-link" style={isActive('/signup')}>
        //                         Signup
        //                     </Link>
        //                 </li>
        //             </Fragment>
        //         )
        //     }

        //     { // showing a user's name on the home page once the user is signed in. When clicked will redirect based on role
        //         isAuth() && isAuth.role === 'admin' && (
        //             <li className="nav-item">
        //                 <Link to="/admin" className="nav-link" style={isActive('/admin')}>
        //                     {isAuth().name}
        //                 </Link>
        //             </li>
        //         )
        //     }

        //     { // showing a user's name on the home page once the user is signed in. When clicked will redirect based on role
        //         isAuth() && isAuth.role === 'subscriber' && (
        //             <li className="nav-item">
        //                 <Link to="/private" className="nav-link" style={isActive('/private')}>
        //                     {isAuth().name}
        //                 </Link>
        //             </li>
        //         )
        //     }

        //     { // showing the signout link on the menu when signed in and redirecting a user to the home page once the user is signed out
        //         isAuth() && (


        //             <li className="nav-item">
        //                 <span className="nav-link"
        //                     style={{ cursor: 'pointer', color: 'wheat' }}
        //                     onClick={() => {
        //                         signout(() => {
        //                             history.push('/')
        //                         })
        //                     }}>Signout</span>
        //             </li>
        //         )
        //     }

        // </ul>
    )


    return (
        <Fragment>
            {nav()}
            <div className="container">
                {children}
            </div>
            <Footer />
        </Fragment>
    )
};

const useStyles = makeStyles(theme => ({
    titleDiv: {
        backgroundColor: "#004e00",
        display: 'flex',
    },
    nameTitle: {
        margin: " auto",
        color: "#fff",
        textAlign: "center",

    },
    navContent: {
        color: "#262626",
    },
    menuContent: {
        display: "flex",
        alignItems: "center",
    },
    menuItems: {
        margin: " auto",
        textAlign: "center",
    },
    dateLine: {
        padding: '0',
        fontSize: '0,5rem',
        marginBottom: '0px',
        marginTop: '0'
    },
    schoolName: {
        fontSize: '2.5rem',
        fontWeight: 'bolder',
    },
    buttonCollapse: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        margin: '10px',
        boxShadow: 'none',
    },
    menuCollapse: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    }
}))

export default withRouter(Layout);
