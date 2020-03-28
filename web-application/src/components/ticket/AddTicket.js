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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {fetchTicket} from '../../actions/ticket/fetchTicket';
import {createTicket} from '../../actions/ticket/createTicket';
import usePrevious from '../../hooks/usePrevious';

export const AddTicket = props => {
  const [transportType, setTransportType] = useState(0);
  const [startLocation, setStartLocation] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endLocation, setEndLocation] = useState(0);
  const [endDate, setEndDate] = useState(new Date());
  const [confirmationNumber, setConfirmationNumber] = useState(0);
  const [notes, setNotes] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const prevLoadingState = usePrevious(props.createTicketLoading);

  // on mount
  useEffect(() => {
    if (
      prevLoadingState &&
      !props.createTicketLoading &&
      props.createTicketError == null
    ) {
      props.dispatch(fetchTicket());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createTicketLoading]);

  const useStyles = makeStyles(theme => ({
    root: {
      width: 'auto',
    },
    listItemText: {
      paddingLeft: theme.spacing(4),
      fontSize: 12,
    },
    listItemSecondary: {
      paddingTop: theme.spacing(0.1),
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleCreateNewTicket = () => {
    if (
      transportType.length === 0 ||
      startLocation.length === 0 ||
      startDate.length === 0 ||
      endLocation.length === 0 ||
      endDate.length === 0
    ) {
      setError(true);
      setErrorMessage('Please fill all required fields to add a new ticket.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(
        createTicket(
          transportType,
          startLocation,
          startDate,
          endLocation,
          endDate,
          confirmationNumber,
          notes,
        ),
      );
    }
  };

  return !props.loading ? (
    <div>
      <div>
        <ListItem button onClick={() => setOpen(!open)}>
          <h3>Add Ticket</h3>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <form>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box display="flex" width={1}>
              <List component="div" disablePadding className={classes.root}>
                <ListItem>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="ticket-transport-type-input">
                      Transport Type
                    </InputLabel>
                    <Select
                      labelId="ticket-transport-type-label"
                      id="ticket-transport-type"
                      value={transportType}
                      onChange={e => setTransportType(e.target.value)}>
                      <MenuItem value="Rail">Rail</MenuItem>
                      <MenuItem value="Bus">Bus</MenuItem>
                      <MenuItem value="Car Rental">Car Rental</MenuItem>
                      <MenuItem value="Cruise">Cruise</MenuItem>
                      <MenuItem value="Ferry">Ferry</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <TextField
                    id="ticket-start-location-input"
                    label="Enter start location"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setStartLocation(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="ticket-start-date-input"
                      label="Enter start date"
                      type="datetime-local"
                      error={error}
                      helperText={errorMessage}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={e => setStartDate(e.target.value)}
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <TextField
                    id="ticket-end-location-input"
                    label="Enter end location"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setEndLocation(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="ticket-end-date-input"
                      label="Enter end date"
                      type="datetime-local"
                      error={error}
                      helperText={errorMessage}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={e => setEndDate(e.target.value)}
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <TextField
                    id="ticket-confirmation-number-input"
                    label="Enter confirmation number (optional)"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setConfirmationNumber(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="ticket-notes-input"
                    label="Enter notes (optional)"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => setNotes(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleCreateNewTicket()}>
                    Create Ticket
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

AddTicket.propTypes = {
  dispatch: PropTypes.func,
  ticket: PropTypes.array,
  loading: PropTypes.bool,
  createTicketMessage: PropTypes.string,
  createTicketLoading: PropTypes.bool,
  createTicketError: PropTypes.string,
};

const mapStateToProps = state => ({
  ticket: state.ticket.getTicket.ticket,
  loading: state.ticket.getTicket.loading,
  error: state.ticket.getTicket.error,
  createTicketMessage: state.ticket.createTicket.createSuccessMessage,
  createTicketLoading: state.ticket.createTicket.createLoading,
  createTicketError: state.ticket.createTicket.createError,
});

export default connect(mapStateToProps)(AddTicket);
