import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Layout from '../core/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, isAuth, signout, updateUser } from '../auth/helpers';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { List, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DraggableDialog from '../admin/adminDialogue'


import { Paper } from '@material-ui/core';


const drawerWidth = '35%';

const AboutUs = ({ children, match, history }) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const isActive = path => {
        if (match.path === path) {
            return { color: '#ff4081' }
        } else {
            return { color: '#262626' }
        }
    }
    //
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    //

    return (
        <Layout>
            <div className={classes.root}>


                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.drawerContainer}>

                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>

                        <Divider />

                        <br />
                        <Link to="/about" color="secondary">
                            <Button style={isActive("/about")} >
                                About Us
                            </Button>
                        </Link>
                        <br />

                        <Divider />
                        <br />
                        <Link >
                            <Button style={isActive("/admin")} >
                                <DraggableDialog />
                            </Button>
                        </Link>
                        <br />
                        <Divider />

                        <br />
                        <Link>
                            <Button>

                                Staffs login
                        </Button>
                        </Link>
                        <br />

                        <Divider />
                    </div>
                </Drawer>
                <Paper className={classes.content} elevation={4}>
                    <div>
                        <Typography variant="h4" className={classes.title}>
                            Our History
                    <Divider className={classes.lineDivider} />
                        </Typography >
                    </div>
                    <div className={classes.toolbar} />
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                        donec massa sapien faucibus et molestie ac.
                </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
                </Paper>
            </div>



        </Layout>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '95%',
        marginLeft: '1%'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,

    },

    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: "inherit",
        margin: 10,
        zIndex: 800,

    },
    paperDiv: {
        padding: theme.spacing(1),
        margin: theme.spacing(5),
        minHeight: '450px'
    },

    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflow: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
            position: "inherit",
        },
    },
    drawerContainer: {
        overflow: 'auto',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        position: "inherit",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        padding: theme.spacing(1),
        margin: theme.spacing(5),
        minHeight: '450px'
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

}));


export default AboutUs;
