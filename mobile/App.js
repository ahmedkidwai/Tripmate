import React from 'react';
import axios from 'axios';
import {url} from './src/utils/globalVars';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import {addNewUser} from './src/api/userApi';
import User from './src/components/User';

class App extends React.Component {
  newUser = '';

  state = {
    userList: [],
  };

  fetchUserList() {
    axios.get(url + ':5000/user').then(res => {
      const userList = res.data;
      this.setState({userList});
    });
  }

  componentDidMount() {
    //invoked immediately after a component is mounted
    this.fetchUserList();
  }

  componentDidUpdate(prevState) {
    //invoked immediately after updating occurs
    if (prevState.userList !== this.state.userList) {
      this.fetchUserList();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.placeholder}
          placeholder="Enter User Name"
          onChangeText={textEntry => {
            this.newUser = textEntry;
          }}
        />
        <Button onPress={() => addNewUser(this.newUser)} title="Add User" />
        <User userList={this.state.userList} />
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
