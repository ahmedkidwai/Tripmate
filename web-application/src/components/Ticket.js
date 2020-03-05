import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  makeStyles,
} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {fetchTicket} from '../actions/ticket';

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
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return !props.loading ? (
    <div>
      <ListItem button onClick={handleClick}>
        <h3>Ticket</h3>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {props.ticket.map((ticket, _id) => (
        <div key={_id}>
          <Collapse in={open} timeout="auto" unmountOnExit>
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
          </Collapse>
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
  ticket: state.ticket.ticket,
  loading: state.ticket.loading,
  error: state.ticket.error,
});

export default connect(mapStateToProps)(Ticket);
