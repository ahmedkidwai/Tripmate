import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text style={styles.Header}>Welcome to Tripmate! By Kurt's Angels</Text>
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
