import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import ConnectedBudget from '../components/Budget';

export default class BudgetManagement extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.header}> Budget management</Text>
        <ConnectedBudget />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#333',
    fontSize: 16,
    lineHeight: 23,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
  Header: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
