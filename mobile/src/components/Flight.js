import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {fetchFlight} from '../actions/fetchFlight';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  ListItem,
  Text,
  Title,
  Body,
  View,
  Spinner,
} from 'native-base';

export class Flight extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFlight();
  }

  state = {
    isShowingFlightInput: false,
  };

  render() {
    return !this.props.loading ? (
      <Container>
        <Content>
          {this.props.flight.map(flight => (
            <View key={flight._id}>
              <Title style={styles.title}>Flight</Title>
              <ListItem>
                <Body>
                  <Text style={styles.primary}>Flight Number</Text>
                  <Text>{`${flight.number} - ${flight.airline}`}</Text>
                </Body>
              </ListItem>
              {flight.status === undefined ? null : (
                <ListItem>
                  <Body>
                    <Text style={styles.primary}>Flight Status</Text>
                    <Text>{flight.status}</Text>
                  </Body>
                </ListItem>
              )}
              {flight.departure === undefined ? null : (
                <ListItem>
                  <Body>
                    <Text style={styles.primary}>Departure</Text>
                    {flight.departure.airport.name === undefined ? null : (
                      <Text>{`Airport: ${flight.departure.airport.name} - ${
                        flight.departure.airport.iata === undefined
                          ? ''
                          : flight.departure.airport.iata
                      }`}</Text>
                    )}
                    {flight.departure.airport.municipalityName ===
                    undefined ? null : (
                      <Text>
                        {`Location: ${
                          flight.departure.airport.municipalityName
                        } - ${flight.departure.airport.countryCode}`}
                      </Text>
                    )}
                    {flight.departure.gate === undefined ? null : (
                      <Text>{`Gate: ${flight.departure.gate}`}</Text>
                    )}
                    {flight.departure.scheduledTimeLocal ===
                    undefined ? null : (
                      <Text>
                        {`Scheduled Time: ${
                          flight.departure.scheduledTimeLocal
                        }`}
                      </Text>
                    )}

                    {flight.departure.actualTimeLocal === undefined ? null : (
                      <Text>
                        {`Actual Time: ${flight.departure.actualTimeLocal}`}
                      </Text>
                    )}
                  </Body>
                </ListItem>
              )}
              {flight.arrival === undefined ? null : (
                <ListItem>
                  <Body>
                    <Text style={styles.primary}>Arrival</Text>
                    {flight.arrival.airport.name === undefined ? null : (
                      <Text>{`Airport: ${flight.arrival.airport.name} - ${
                        flight.arrival.airport.iata === undefined
                          ? ''
                          : flight.arrival.airport.iata
                      }`}</Text>
                    )}
                    {flight.arrival.airport.municipalityName ===
                    undefined ? null : (
                      <Text>
                        {`Location: ${
                          flight.arrival.airport.municipalityName
                        } - ${flight.arrival.airport.countryCode}`}
                      </Text>
                    )}
                    {flight.arrival.gate === undefined ? null : (
                      <Text>{`Gate: ${flight.arrival.gate}`}</Text>
                    )}
                    {flight.arrival.scheduledTimeLocal === undefined ? null : (
                      <Text>
                        {`Scheduled Time: ${flight.arrival.scheduledTimeLocal}`}
                      </Text>
                    )}

                    {flight.arrival.actualTimeLocal === undefined ? null : (
                      <Text>
                        {`Actual Time: ${flight.arrival.actualTimeLocal}`}
                      </Text>
                    )}
                  </Body>
                </ListItem>
              )}
            </View>
          ))}
        </Content>
      </Container>
    ) : (
      <Spinner />
    );
  }
}

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

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
  },
  primary: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});

const mapDispatchToProps = dispatch => ({
  fetchFlight: () => dispatch(fetchFlight()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Flight);
