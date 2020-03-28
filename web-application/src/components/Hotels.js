import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchHotel, fetchHotelAPI} from '../actions/hotel/fetchHotel';

export const Hotels = props => {
  const [location, setLocation] = useState('');
  const [adults, setAdults] = useState('');
  const [rooms, setRooms] = useState('');
  const [nights, setNights] = useState('');
  const [checkIn, setCheckin] = useState(new Date());

  // on mount
  useEffect(() => {
    props.dispatch(fetchHotel());
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

  const handleLocation = e => {
    setLocation(e.target.value);
  };

  const handleAdults = e => {
    setAdults(e.target.value);
  };

  const handleRooms = e => {
    setRooms(e.target.value);
  };

  const handleNights = e => {
    setNights(e.target.value);
  };

  const handleCheckin = e => {
    setCheckin(e.target.value);
  };

  if (!props.loading) {
    return (
      <div>
        <div>
          <form>
            <h1>Search Hotels</h1>
            <ListItem>
              <TextField
                id="hotel-location"
                label="Enter location"
                onChange={e => handleLocation(e)}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="hotel-adults"
                label="Number of Adults"
                onChange={e => handleAdults(e)}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="hotel-rooms"
                label="Number of Rooms"
                onChange={e => handleRooms(e)}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="hotel-nights"
                label="Number of Nights"
                onChange={e => handleNights(e)}
              />
            </ListItem>
            <ListItem>
              <FormControl className={classes.formControl}>
                <TextField
                  id="hotel-date"
                  label="Enter Check-in Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => handleCheckin(e)}
                />
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() =>
                  props.dispatch(
                    fetchHotelAPI(location, adults, rooms, nights, checkIn),
                  )
                }>
                Search
              </Button>
            </ListItem>
          </form>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => props.dispatch(fetchHotel())}>
            Get my Hotels
          </Button>
        </div>

        <div>
          <h1>List of Hotels</h1>
          {props.hotel.map(hotel => (
            <div key={hotel._id}>
              <List component="div" disablePadding className={classes.root}>
                <ListItem>
                  <ListItemText
                    className={classes.listItemText}
                    primary="Name"
                    secondary={`${hotel.name}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Price"
                    secondary={`${hotel.price}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Location"
                    secondary={`${hotel.location}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Check-in"
                    secondary={`${hotel.checkIn}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Check-out"
                    secondary={`${hotel.checkOut}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Number of ratings"
                    secondary={`${hotel.numRating}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Rating"
                    secondary={`${hotel.rating}`}
                  />
                  <ListItemText
                    className={classes.listItemText}
                    primary="Price Level"
                    secondary={`${hotel.priceLevel}`}
                  />
                </ListItem>
              </List>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <CircularProgress />;
};

Hotels.propTypes = {
  dispatch: PropTypes.func,
  hotel: PropTypes.array,
  loading: PropTypes.bool,
  createHotelMessage: PropTypes.string,
  createHotelLoading: PropTypes.bool,
  createHotelError: PropTypes.string,
};

const mapStateToProps = state => ({
  hotel: state.hotel.getHotels.hotel,
  loading: state.hotel.getHotels.loading,
  error: state.hotel.getHotels.error,
  createHotelMessage: state.hotel.createHotel.createSuccessMessage,
  createHotelLoading: state.hotel.createHotel.createLoading,
  createHotelError: state.hotel.createHotel.createError,
});

export default connect(mapStateToProps)(Hotels);
