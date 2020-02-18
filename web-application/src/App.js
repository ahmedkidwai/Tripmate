import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import './CSS/App.css';

import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            TripMate
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left">
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {[
              'Home',
              'Create Trip',
              'Modify Trips',
              'View Trips',
              'Delete Trips',
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={
                  text === 'Home'
                    ? '/' + text.replace('Home', '')
                    : '/' + text.replace(/ /g, '')
                }>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : ''}
                  {index === 1 ? <AddIcon /> : ''}
                  {index === 2 ? <EditIcon /> : ''}
                  {index === 3 ? <ListAltIcon /> : ''}
                  {index === 4 ? <DeleteIcon /> : ''}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['About'].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={'/' + text.replace(/ /g, '')}>
                <ListItemIcon>{index === 0 ? <InfoIcon /> : ''}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <h1> Welcome to Tripmate! By Kurt's Angels</h1>
                </div>
              )}
            />
            <Route
              path="/CreateTrip"
              render={() => (
                <div>
                  {' '}
                  <h1>Create a Trip</h1>
                  <p1>
                    {' '}
                    Coming Soon a form that will let you create new trips
                  </p1>
                </div>
              )}
            />
            <Route
              path="/ModifyTrips"
              render={() => (
                <div>
                  {' '}
                  <h1>View Your Trips</h1>
                  <p1>
                    {' '}
                    Coming Soon a page that will let you modify your trips!
                  </p1>
                </div>
              )}
            />
            <Route
              path="/ViewTrips"
              render={() => (
                <div>
                  {' '}
                  <h1>View Trips</h1>
                  <p1>
                    {' '}
                    Coming Soon a page that will let you view all your trips!
                  </p1>
                </div>
              )}
            />
            <Route
              path="/DeleteTrips"
              render={() => (
                <div>
                  {' '}
                  <h1>Delete Trips</h1>
                  <p1>
                    {' '}
                    A function even more scary than rebasing. Coming Soon!!
                  </p1>
                </div>
              )}
            />
            <Route
              path="/About"
              render={() => (
                <div>
                  {' '}
                  <h1>About</h1>
                  <p1>
                    {' '}
                    Tripmate is a distirbuted web and mobile application made by
                    Kurt's Angels (Group 3??) for Comp 4350 - Software
                    Engineering 2. It is the silver bullet for all things
                    organizing trips.
                  </p1>
                  <div id="Center">
                    <br />
                    Here's a picture of a CFL Legend after finally realizing his
                    dreams.
                    <div>
                      {' '}
                      <img src="https://i.imgur.com/12xv91I.jpg" alt="Kurt-CFL" />
                    </div>
                  </div>
                </div>
              )}
            />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
