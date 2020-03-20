import React, {Component} from 'react';

import {Container, Content} from 'native-base';

import ConnectedTicket from '../components/Ticket';

export default class Ticket extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ConnectedTicket />
        </Content>
      </Container>
    );
  }
}
