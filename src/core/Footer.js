import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Button, Grid } from '@material-ui/core'

const Footer = () => {

    const classes = useStyles();
    const currentYear = new Date().getFullYear()

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={0}
                className={classes.footerText, classes.footerSections}
            >
                <Grid item xs={12} sm={4}>
                    <div typeof="Organization" className={classes.footerContent} >
                        <span property="name">Awgu High School - Nenwe.</span>
                        <div property="address" typeof="PostalAddress">
                            <span property="streetAddress">Nenwe- Aninri LGA</span>
                            <span property="addressLocality" style={{ display: 'block' }}>
                                Enugu State, Nigeria{' '}
                            </span>
                            <span property="postalCode">PMB 18, Nenwe</span>
                        </div>
                        <span property="telephone">(00 234) 283-3771</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid container>
                        <Grid
                            className={classes.flexContainer}
                            style={{ justifyContent: 'center' }}
                            item
                            xs={12}
                        >
                            <Button
                                style={{ width: '200px' }}
                                className={classes.invertedBtnDark}
                                href="#"
                                title="Request Info"
                            >
                                Request Info
                            </Button>
                        </Grid>
                        <Grid
                            className={classes.flexContainer}
                            style={{ justifyContent: 'flex-end' }}
                            item
                            xs={6}
                        >
                            <Button
                                style={{ width: '92px' }}
                                className={classes.invertedBtnDark}
                                href="#"
                                title="donate"
                            >
                                Donate
                            </Button>
                        </Grid>
                        <Grid className={classes.flexContainer} item xs={6}>
                            <Button
                                style={{ width: '92px' }}
                                className={classes.invertedBtnDark}
                                href="#"
                                title="Visit"
                            >
                                Visit Us
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ul style={{ listStyle: 'none', margin: 0 }}>
                        <li>
                            <Link
                                prefetch='true'
                                as="/contact"
                                to="/contact"
                            >
                                <p className={classes.white} style={{ fontWeight: 400 }}>
                                    Contact
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                prefetch='true'
                                as="/directions-and-attractions"
                                to="/about"
                            >
                                <p className={classes.white} style={{ fontWeight: 400 }}>
                                    Directions
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                prefetch='true'
                                as="/consumer"
                                to="/consumer"
                            >
                                <p className={classes.white} style={{ fontWeight: 400 }}>
                                    Nondiscrimination Statement
                                </p>
                            </Link>
                        </li>

                    </ul>
                </Grid>
            </Grid>
            <Grid className={classes.subFooter} item xs={12}>
                <Typography
                    className={classes.white}
                    variant="h6"
                    component={'span'}
                >
                    © {currentYear} Awgu High School - Nenwe.
                </Typography>
            </Grid>
        </div>
    )

}

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 30,
        backgroundColor: "#006700",
        //backgroundColor: `${theme.palette.primary[500]}`,
        borderTop: 'solid 3px #998643',
        paddingTop: '16px',
        overflowX: 'hidden'
    },
    footerSections: {
        margin: '0 16px'
    },
    subFooter: {

        backgroundColor: "#004e00",
        textAlign: 'center',
        padding: '8px 16px 8px 16px',
        marginTop: '8px'
    },
    footerText: {
        color: '#fff',
        fontSize: '18px',
        lineHeight: 1.5
    },
    invertedBtnDark: {
        color: '#fff',
        backgroundColor: 'transparent',
        border: '2px #fff solid',
        boxShadow: 'none',
        margin: '8px'
    },
    white: {
        color: '#ffffff'
    },
    flexContainer: {
        display: 'flex'
    },
    footerContent: {
        padding: '0 5%',
        color: '#fff',
        fontSize: '18px',
        lineHeight: 1.5
    }
}))

export default Footer;
