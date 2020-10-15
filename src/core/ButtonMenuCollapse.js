import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Drawer } from '@material-ui/core';


const drawerWidth = '30%';

const useStyles = makeStyles((theme) => ({
    buttonCollapse: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        margin: '10px',
        boxShadow: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: 'inherit'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    }
}));

const ButtonMenuCollapse = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    return (
        <div className={classes.buttonCollapse}>
            <IconButton onClick={handleMenu}>
                <MenuIcon />
            </IconButton>
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.children}

            </Drawer>
        </div>
    );
};




export default ButtonMenuCollapse;
