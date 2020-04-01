import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HotelIcon from '@material-ui/icons/Hotel';
import FlightIcon from '@material-ui/icons/Flight';
import NoteIcon from '@material-ui/icons/Note';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import '../../css/App.css';

import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';

import ConnectedHotels from '../Hotels';
import ConnectedBudget from '../Budget';
import ConnectedToDoList from '../ToDoList';
import ConnectedTicket from '../ticket/Ticket';
import ConnectedAddTicket from '../ticket/AddTicket';
import ConnectedFlight from '../flight/Flight';
import ConnectedAddFlight from '../flight/AddFlight';

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

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} />
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
            {['Home', 'Hotels', 'Flights', 'Tickets', 'Budgets', 'Todos'].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  component={Link}
                  to={
                    text === 'Home'
                      ? `/${text.replace('Home', '')}`
                      : `/${text.replace(/ /g, '')}`
                  }>
                  <ListItemIcon>
                    {index === 0 ? <HomeIcon /> : ''}
                    {index === 1 ? <HotelIcon /> : ''}
                    {index === 2 ? <FlightIcon /> : ''}
                    {index === 3 ? <ConfirmationNumberIcon /> : ''}
                    {index === 4 ? <NoteIcon /> : ''}
                    {index === 5 ? <ListIcon /> : ''}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ),
            )}
          </List>
          <Divider />
          <List>
            {['About'].map((text, index) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={`/${text.replace(/ /g, '')}`}>
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
                  <h1> Welcome to Tripmate! By Kurt&apos;s Angels</h1>
                </div>
              )}
            />
            <Route
              path="/Hotels"
              render={() => (
                <div>
                  <ConnectedHotels />
                </div>
              )}
            />
            <Route
              path="/Flights"
              render={() => (
                <div>
                  <ConnectedAddFlight />
                  <ConnectedFlight />
                </div>
              )}
            />
            <Route
              path="/Tickets"
              render={() => (
                <div>
                  <ConnectedAddTicket />
                  <ConnectedTicket />
                </div>
              )}
            />
            <Route
              path="/Budgets"
              render={() => (
                <div>
                  <ConnectedBudget />
                </div>
              )}
            />
            <Route
              path="/Todos"
              render={() => (
                <div>
                  <ConnectedToDoList />
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
                    Kurt&apos;s Angels (Group 3??) for Comp 4350 - Software
                    Engineering 2. It is the silver bullet for all things
                    organizing trips.
                  </p1>
                  <div id="Center">
                    <br />
                    Here&apos;s a picture of a CFL Legend after finally
                    realizing his dreams.
                    <div>
                      {' '}
                      <img
                        src="https://i.imgur.com/12xv91I.jpg"
                        alt="Kurt-CFL"
                      />
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

export default Dashboard;
