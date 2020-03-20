import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {fetchTicket} from '../actions/fetchTicket';
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

export class Ticket extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTicket();
  }

  state = {
    isShowingTicketInput: false,
  };

  render() {
    return !this.props.loading ? (
      <Container>
        <Content>
          {this.props.ticket.map(ticket => (
            <View key={ticket._id}>
              <Title style={styles.title}>Ticket</Title>
              <ListItem>
                <Body>
                  <Text style={styles.primary}>Type</Text>
                  <Text>{ticket.transportType}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={styles.primary}>Departure</Text>
                  <Text>{`${ticket.start.location} - ${
                    ticket.start.date
                  }`}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={styles.primary}>Arrival</Text>
                  <Text>{`${ticket.end.location} - ${ticket.end.date}`}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={styles.primary}>Confirmation Number</Text>
                  <Text>{ticket.confirmationNumber}</Text>
                </Body>
              </ListItem>
              <ListItem>
                <Body>
                  <Text style={styles.primary}>Notes</Text>
                  <Text>{ticket.notes}</Text>
                </Body>
              </ListItem>
            </View>
          ))}
        </Content>
      </Container>
    ) : (
      <Spinner />
    );
  }
}

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
  fetchTicket: () => dispatch(fetchTicket()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ticket);
