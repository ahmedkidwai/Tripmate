import React, {Component} from 'react';

import {
  Container,
  Header,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body,
} from 'native-base';

export default class TodoList extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Text>Need to do</Text>
        </Header>
        <Content>
          <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>Code every day</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Do not implement bug</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={false} color="green" />
            <Body>
              <Text>Sleep</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
