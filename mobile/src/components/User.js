import React from 'react';
import { Text } from 'react-native';

class User extends React.Component { 
    render(){
        return this.props.userList.map(user => <Text key={user._id}>{user.username}</Text>);
    }
}

export default User;