import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  List,
  ListItem,
  Box,
  TextField,
  Collapse,
  Button,
  makeStyles,
} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {fetchFlight} from '../../actions/flight/fetchFlight';
import {
  createFlightManually,
  createFlightAutomatically,
} from '../../actions/flight/createFlight';

export const AddFlight = props => {
  const [departureCity, setDepartureCity] = useState(0);
  const [departureCountry, setDepartureCountry] = useState(0);
  const [departureAirport, setDepartureAirport] = useState(0);
  const [departureGate, setDepartureGate] = useState(0);
  const [departureTime, setDepartureTime] = useState(0);
  const [arrivalCity, setArrivalCity] = useState(0);
  const [arrivalCountry, setArrivalCountry] = useState(0);
  const [arrivalAirport, setArrivalAirport] = useState(0);
  const [arrivalGate, setArrivalGate] = useState(0);
  const [arrivalTime, setArrivalTime] = useState(0);
  const [flightNumber, setFlightNumber] = useState(0);
  const [flightDate, setFlightDate] = useState(0);
  const [airline, setAirline] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // on mount
  useEffect(() => {
    if (!props.createFlightLoading && props.createFlightError) {
      props.dispatch(fetchFlight());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createFlightLoading]);

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
  const [openManual, setOpenManual] = useState(false);
  const [openAuto, setOpenAuto] = useState(false);

  const handleCreateNewFlightManually = () => {
    if (
      departureCity.length === 0 ||
      departureCountry.length === 0 ||
      departureAirport.length === 0 ||
      departureGate.length === 0 ||
      departureTime.length === 0 ||
      arrivalCity.length === 0 ||
      arrivalCountry.length === 0 ||
      arrivalAirport.length === 0 ||
      arrivalGate.length === 0 ||
      arrivalTime.length === 0 ||
      flightNumber.length === 0 ||
      airline.length === 0
    ) {
      setError(true);
      setErrorMessage('Please fill all fields to add a new flight.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(
        createFlightManually(
          departureCity,
          departureCountry,
          departureAirport,
          departureGate,
          departureTime,
          arrivalCity,
          arrivalCountry,
          arrivalAirport,
          arrivalGate,
          arrivalTime,
          flightNumber,
          flightDate,
          airline,
        ),
      );
      window.location.reload(false);
    }
  };

  const handleCreateNewFlightAutomatically = () => {
    if (setFlightNumber.length === 0) {
      setError(true);
      setErrorMessage('Fligth number cannot be empty.');
    } else if (setFlightDate.length === 0) {
      setError(true);
      setErrorMessage('Fligth date cannot be empty.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(createFlightAutomatically(flightNumber, flightDate));
      window.location.reload(false);
    }
  };

  return !props.loading ? (
    <div>
      <div>
        <ListItem button onClick={() => setOpenAuto(!openAuto)}>
          <h3>Add Flight Automatically</h3>
          {openAuto ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <form>
          <Collapse in={openAuto} timeout="auto" unmountOnExit>
            <Box display="flex">
              <List component="div" disablePadding className={classes.root}>
                <ListItem>
                  <TextField
                    id="flight-number-input"
                    label="Enter flight number"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setFlightNumber(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-date-input"
                    label="Enter flight date"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setFlightDate(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleCreateNewFlightAutomatically()}>
                    Create Flight
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Collapse>
        </form>
      </div>

      <div>
        <ListItem button onClick={() => setOpenManual(!openManual)}>
          <h3>Add Flight Manually</h3>
          {openManual ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <form>
          <Collapse in={openManual} timeout="auto" unmountOnExit>
            <Box display="flex">
              <List component="div" disablePadding className={classes.root}>
                <ListItem>
                  <TextField
                    id="flight-number-input"
                    label="Enter flight number"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setFlightNumber(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-airline-input"
                    label="Enter airline"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setAirline(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <h3>Departure</h3>
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-departure-city-input"
                    label="Enter departure city"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setDepartureCity(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-departure-country-input"
                    label="Enter departure country"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setDepartureCountry(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-departure-airport-input"
                    label="Enter departure airport"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setDepartureAirport(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-departure-gate-input"
                    label="Enter departure gate"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setDepartureGate(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-departure-time-input"
                    label="Enter departure time"
                    type="datetime-local"
                    error={error}
                    helperText={errorMessage}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={e => setDepartureTime(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <h3>Arrival</h3>
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-arrival-city-input"
                    label="Enter arrival city"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setArrivalCity(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-arrival-country-input"
                    label="Enter arrival country"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setArrivalCountry(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-arrival-airport-input"
                    label="Enter arrival airport"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setArrivalAirport(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-arrival-gate-input"
                    label="Enter arrival gate"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setArrivalGate(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="flight-arrival-time-input"
                    label="Enter arrival time"
                    type="datetime-local"
                    error={error}
                    helperText={errorMessage}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={e => setArrivalTime(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleCreateNewFlightManually()}>
                    Create Flight
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Collapse>
        </form>
      </div>
    </div>
  ) : null;
};

AddFlight.propTypes = {
  dispatch: PropTypes.func,
  flight: PropTypes.array,
  loading: PropTypes.bool,
  createFlightMessage: PropTypes.string,
  createFlightLoading: PropTypes.bool,
  createFlightError: PropTypes.string,
};

const mapStateToProps = state => ({
  flight: state.flight.getFlight.flight,
  loading: state.flight.getFlight.loading,
  error: state.flight.getFlight.error,
  createFlightMessage: state.flight.createFlight.createSuccessMessage,
  createFlightLoading: state.flight.createFlight.createLoading,
  createFlightError: state.flight.createFlight.createError,
});

export default connect(mapStateToProps)(AddFlight);
