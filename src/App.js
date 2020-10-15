import React from 'react';
import Layout from './core/Layout';

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './images/unicornbike.jpg'
import { Divider, Grid, Paper } from '@material-ui/core'



const App = () => {

  const classes = useStyles()

  return (
    <Layout >
      <Paper elevation={3} className={classes.card}>

        <Typography variant="h6" className={classes.title}>
          Welcome To Our Home
        </Typography>
        <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle" />
        <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash
        </Typography>
        <CardContent>

        </CardContent>
      </Paper>
      {/* +++++++++++ */}
      <Paper elevation={1} style={{ padding: '2' }}>

        <Grid container spacing={2} className={classes.gridMain}>
          <Grid item xs >
            <Paper className={classes.paper}>
              <h2 className={classes.leadText}>News & Announcements</h2>

            </Paper>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <Paper className={classes.paper}>
              <h2 className={classes.leadText}>Covid-19 Alert</h2>
            </Paper>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <Paper className={classes.paper}>
              <h2 className={classes.leadText}>Sporting Activities</h2>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '75%',
    margin: 'auto',
    padding: '7px',
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: '#004d00',
    textTransform: "uppercase"
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771'
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#f5f5f5'
  },
  leadText: {
    color: '#004d00',
    fontWeight: 'bold',
  },
  gridMain: {
    paddingLeft: '0.2rem',
    paddingRight: '0.2rem',
  },
}))

export default App;
