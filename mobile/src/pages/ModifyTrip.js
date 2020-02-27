import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';

export default class ModifyTrip extends Component {
  render() {
    return (
      <View>
        <Text style={styles.Header}>
          Coming Soon a page that will let you modify your trips!{' '}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
