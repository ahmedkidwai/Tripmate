import React, {Component} from 'react';

import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './src/pages/Home';
import CreateTrip from './src/pages/CreateTrip';
import ModifyTrip from './src/pages/ModifyTrip';
import BudgetManagement from './src/pages/BudgetManagement';
import TodoList from './src/pages/TodoList';
import Ticket from './src/pages/Ticket';
import Flight from './src/pages/Flight';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('./image/drawer.png')}
            style={styles.DrawerImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Homepage_StackNavigator = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const CreateTrip_StackNavigator = createStackNavigator({
  Second: {
    screen: CreateTrip,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const ModifyTrip_StackNavigator = createStackNavigator({
  Third: {
    screen: ModifyTrip,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const BudgetManagement_StackNavigator = createStackNavigator({
  Fourth: {
    screen: BudgetManagement,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const TodoList_StackNavigator = createStackNavigator({
  Fifth: {
    screen: TodoList,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Ticket_StackNavigator = createStackNavigator({
  Fifth: {
    screen: Ticket,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Flight_StackNavigator = createStackNavigator({
  Fifth: {
    screen: Flight,
    navigationOptions: ({navigation}) => ({
      title: 'TripMate',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: '#3f51b5',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  Home: {
    screen: Homepage_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  CreateTrip: {
    screen: CreateTrip_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Create Trip',
    },
  },
  ModifyTrip: {
    screen: ModifyTrip_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Modify Trips',
    },
  },
  BudgetManagement: {
    screen: BudgetManagement_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Budget management',
    },
  },
  TodoList: {
    screen: TodoList_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Todo List',
    },
  },
  Ticket: {
    screen: Ticket_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Ticket',
    },
  },
  Flight: {
    screen: Flight_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Flight',
    },
  },
});

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
  },
  DrawerImage: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});

export default createAppContainer(DrawerNavigatorExample);
