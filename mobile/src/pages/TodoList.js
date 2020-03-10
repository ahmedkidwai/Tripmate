import React, {Component} from 'react';

import {Container, Content} from 'native-base';

import ConnectedToDoList from '../components/ToDoList';

export default class TodoList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ConnectedToDoList />
        </Content>
      </Container>
    );
  }
}
