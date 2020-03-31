import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import ConnectedTripCollection from '../components/Trip/TripCollection';

export default class Home extends Component {
  render() {
    return (
      <ScrollView>
        <ConnectedTripCollection />
      </ScrollView>
    );
  }
}
