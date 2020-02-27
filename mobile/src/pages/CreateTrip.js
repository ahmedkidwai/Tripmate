import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {Container} from 'native-base';

export default class CreateTrip extends Component {
  render() {
    return (
      <Container>
        <View>
          <Text style={styles.Header}> Create a Trip </Text>
        </View>
        <View>
          <Text style={styles.BodyText}>
            {' '}
            Coming Soon a form that will let you create new trips{' '}
          </Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  BodyText: {
    fontSize: 23,
  },
});
