import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import {fetchTicket} from '../../actions/ticket/fetchTicket';

export const Ticket = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchTicket());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    listItemText: {
      paddingLeft: theme.spacing(4),
      fontSize: 12,
    },
  }));

  const classes = useStyles();

  return !props.loading ? (
    <div>
      <h1>Ticket</h1>
      {props.ticket.map(ticket => (
        <div key={ticket._id}>
          <List component="div" disablePadding className={classes.root}>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary={'Type'}
                secondary={ticket.transportType}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Departure"
                secondary={`${ticket.start.location} - ${ticket.start.date}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Arrival"
                secondary={`${ticket.end.location} - ${ticket.end.date}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Confirmation Number"
                secondary={ticket.confirmationNumber}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Notes"
                secondary={ticket.notes}
              />
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  ) : null;
};

Ticket.propTypes = {
  dispatch: PropTypes.func,
  ticket: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ticket: state.ticket.getTicket.ticket,
  loading: state.ticket.getTicket.loading,
  error: state.ticket.getTicket.error,
});

export default connect(mapStateToProps)(Ticket);
