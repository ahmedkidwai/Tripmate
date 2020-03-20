import React, {Component} from 'react';

import {Container, Content} from 'native-base';

import ConnectedFlight from '../components/Flight';

export default class Flight extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ConnectedFlight />
        </Content>
      </Container>
    );
  }
}
