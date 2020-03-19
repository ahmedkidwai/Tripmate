import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import {fetchFlight} from '../../actions/fetchFlight';

export const Flight = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchFlight());
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
    listItemSecondary: {
      paddingTop: theme.spacing(0.1),
    },
  }));

  const classes = useStyles();

  return !props.loading ? (
    <div>
      <h1>Flight</h1>
      {props.flight.map(flight => (
        <div key={flight._id}>
          <List component="div" disablePadding className={classes.root}>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Flight Number"
                secondary={`${flight.number} - ${flight.airline}`}
              />
            </ListItem>
            {flight.status === undefined ? (
              ''
            ) : (
              <ListItem>
                <ListItemText
                  className={classes.listItemText}
                  primary="Flight Status"
                  secondary={flight.status}
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Departure"
                secondary={
                  <React.Fragment>
                    {flight.departure.airport.name === undefined ? (
                      ''
                    ) : (
                      <li>{`Airport: ${flight.departure.airport.name}`}</li>
                    )}

                    {flight.departure.airport.municipalityName === undefined ? (
                      ''
                    ) : (
                      <li>
                        {`Location: ${flight.departure.airport.municipalityName} - ${flight.departure.airport.countryCode}`}
                      </li>
                    )}

                    {flight.departure.gate === undefined ? (
                      ''
                    ) : (
                      <li>{`Gate: ${flight.departure.gate}`}</li>
                    )}
                    {flight.departure.scheduledTimeLocal === undefined ? (
                      ''
                    ) : (
                      <li>
                        {`Scheduled Time: ${flight.departure.scheduledTimeLocal}`}
                      </li>
                    )}

                    {flight.departure.actualTimeLocal === undefined ? (
                      ''
                    ) : (
                      <li>
                        {`Actual Time: ${flight.departure.actualTimeLocal}`}
                      </li>
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.listItemText}
                primary="Arrival"
                secondary={
                  <React.Fragment>
                    {flight.arrival.airport.name === undefined ? (
                      ''
                    ) : (
                      <li>{`Airport: ${flight.arrival.airport.name}`}</li>
                    )}

                    {flight.arrival.airport.municipalityName === undefined ? (
                      ''
                    ) : (
                      <li>
                        {`Location: ${flight.arrival.airport.municipalityName} - ${flight.arrival.airport.countryCode}`}
                      </li>
                    )}

                    {flight.arrival.gate === undefined ? (
                      ''
                    ) : (
                      <li>{`Gate: ${flight.arrival.gate}`}</li>
                    )}

                    {flight.arrival.scheduledTimeLocal === undefined ? (
                      ''
                    ) : (
                      <li>
                        {`Scheduled Time: ${flight.arrival.scheduledTimeLocal}`}
                      </li>
                    )}

                    {flight.arrival.actualTimeLocal === undefined ? (
                      ''
                    ) : (
                      <li>
                        {`Actual Time: ${flight.arrival.actualTimeLocal}`}
                      </li>
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  ) : null;
};

Flight.propTypes = {
  dispatch: PropTypes.func,
  flight: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  flight: state.flight.getFlight.flight,
  loading: state.flight.getFlight.loading,
  error: state.flight.getFlight.error,
});

export default connect(mapStateToProps)(Flight);
