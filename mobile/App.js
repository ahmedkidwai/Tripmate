import React from 'react';
import {View, StyleSheet} from 'react-native';
import User from './src/components/User';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <User />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
});

export default App;
