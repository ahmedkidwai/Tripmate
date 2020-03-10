import React from 'react';
import PropTypes from 'prop-types';
import {fetchToDoList} from '../actions/fetchTodoList';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  ListItem,
  CheckBox,
  Text,
  Body,
  View,
} from 'native-base';

export class ToDoList extends React.Component {
  componentDidMount() {
    this.props.fetchToDoList();
  }

  render() {
    return !this.props.loading ? (
      <Container>
        <Content>
          {this.props.todolist.map((todolist, _id) => (
            <View key={todolist._id}>
              <Text>{todolist.name}</Text>
              {todolist.items.map(todoitem => (
                <View key={todoitem._id}>
                  <ListItem>
                    <CheckBox checked={todoitem.done} />
                    <Body>
                      <Text> {todoitem.content} </Text>
                    </Body>
                  </ListItem>
                </View>
              ))}
            </View>
          ))}
        </Content>
      </Container>
    ) : null;
  }
}

ToDoList.propTypes = {
  fetchToDoList: PropTypes.func,
  todolist: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  todolist: state.todolist.todolist,
  loading: state.todolist.loading,
  error: state.todolist.error,
});

const mapDispatchToProps = dispatch => ({
  fetchToDoList: () => dispatch(fetchToDoList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);
