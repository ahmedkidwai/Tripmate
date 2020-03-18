import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {fetchToDoList} from '../actions/fetchTodoList';
import {deleteToDoList} from '../actions/deleteToDoList';
import {deleteToDoItem} from '../actions/deleteToDoItem';
import {updateToDoList} from '../actions/updateToDoList';
import {updateToDoItem} from '../actions/updateToDoItem';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  ListItem,
  CheckBox,
  Text,
  Title,
  Body,
  Button,
  Icon,
  View,
  Spinner,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';

export class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchToDoList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.deleteListLoading !== this.props.deleteListLoading ||
      prevProps.deleteItemLoading !== this.props.deleteItemLoading ||
      prevProps.updateListLoading !== this.props.updateListLoading ||
      prevProps.updateItemLoading !== this.props.updateItemLoading
    ) {
      this.props.fetchToDoList();
    }
  }

  state = {
    isShowingListInput: false,
    isShowingItemInput: false,
  };

  displayEditListBox() {
    this.setState({isShowingListInput: true});
  }

  displayEditItemBox() {
    this.setState({isShowingItemInput: true});
  }

  handleUpdateToDoList(todolistid, newTodolist) {
    this.props.updateToDoList(todolistid, newTodolist);
    this.setState({isShowingListInput: false});
  }

  handleUpdateToDoItem(listId, itemId, newTodoItem, newTodoItemState) {
    this.props.updateToDoItem(listId, itemId, newTodoItem, newTodoItemState);
    this.setState({isShowingItemInput: false});
  }

  render() {
    return !this.props.loading ? (
      <Container>
        <Content>
          {this.props.todolist.map(todolist => (
            <View key={todolist._id}>
              <View style={styles.placeholder}>
                <Title>{todolist.name}</Title>

                <View style={styles.placeholder}>
                  <Button
                    onPress={() => {
                      this.displayEditListBox();
                    }}
                    small
                    primary
                    iconLeft
                    light>
                    <Icon name="md-create" />
                    <Text>Edit</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      this.props.deleteToDoList(todolist._id);
                    }}
                    small
                    iconLeft
                    light>
                    <Icon name="md-remove-circle" />
                    <Text>Delete</Text>
                  </Button>
                </View>
              </View>
              {this.state.isShowingListInput && (
                <View>
                  <View>
                    <Form>
                      <Item floatingLabel>
                        <Label>list name</Label>
                        <Input
                          onChangeText={textEntry => {
                            this.newToDoList = textEntry;
                          }}
                        />
                      </Item>
                    </Form>
                  </View>
                  <Content>
                    <Button
                      onPress={() => {
                        this.handleUpdateToDoList(
                          todolist._id,
                          this.newToDoList,
                        );
                      }}
                      small
                      light
                      transparent>
                      <Icon name="md-create" />
                      <Text>Update</Text>
                    </Button>
                  </Content>
                </View>
              )}
              {todolist.items.map(todoitem => (
                <View key={todoitem._id}>
                  <ListItem>
                    <CheckBox checked={todoitem.done} />
                    <Body>
                      <Text> {todoitem.content} </Text>
                    </Body>
                    <Button
                      onPress={() => {
                        this.displayEditItemBox();
                      }}
                      small
                      primary
                      iconLeft
                      light>
                      <Icon name="md-create" />
                      <Text>Edit</Text>
                    </Button>
                    <Button
                      onPress={() => {
                        this.props.deleteToDoItem(todolist._id, todoitem._id);
                      }}
                      small
                      light>
                      <Icon name="md-remove-circle" />
                      <Text>Delete</Text>
                    </Button>
                  </ListItem>
                  {this.state.isShowingItemInput && (
                    <View>
                      <View>
                        <Form>
                          <Item floatingLabel>
                            <Label>item name</Label>
                            <Input
                              onChangeText={textEntry => {
                                this.newTodoitem = textEntry;
                              }}
                            />
                          </Item>
                        </Form>
                      </View>
                      <Content>
                        <Button
                          onPress={() => {
                            this.handleUpdateToDoItem(
                              todolist._id,
                              todoitem._id,
                              this.newTodoitem,
                              todoitem.done,
                            );
                          }}
                          small
                          light
                          transparent>
                          <Icon name="md-create" />
                          <Text>Update</Text>
                        </Button>
                      </Content>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </Content>
      </Container>
    ) : (
      <Spinner />
    );
  }
}

ToDoList.propTypes = {
  dispatch: PropTypes.func,
  todolist: PropTypes.array,
  loading: PropTypes.bool,
  createListMessage: PropTypes.string,
  createListLoading: PropTypes.bool,
  createListError: PropTypes.string,
  deleteListMessage: PropTypes.string,
  deleteListLoading: PropTypes.bool,
  deleteListError: PropTypes.string,
  updateListMessage: PropTypes.string,
  updateListLoading: PropTypes.bool,
  updateListError: PropTypes.string,
  createItemMessage: PropTypes.string,
  createItemLoading: PropTypes.bool,
  createItemError: PropTypes.string,
  deleteItemMessage: PropTypes.string,
  deleteItemLoading: PropTypes.bool,
  deleteItemError: PropTypes.string,
  updateItemMessage: PropTypes.string,
  updateItemLoading: PropTypes.bool,
  updateItemError: PropTypes.string,
};

const mapStateToProps = state => ({
  todolist: state.todolist.getToDoList.todolist,
  loading: state.todolist.getToDoList.loading,
  error: state.todolist.getToDoList.error,
  createListMessage: state.todolist.createToDoList.createSuccessMessage,
  createListLoading: state.todolist.createToDoList.createLoading,
  createListError: state.todolist.createToDoList.createError,
  deleteListMessage: state.todolist.deleteToDoList.deleteSuccessMessage,
  deleteListLoading: state.todolist.deleteToDoList.deleteLoading,
  deleteListError: state.todolist.deleteToDoList.deleteError,
  updateListMessage: state.todolist.updateToDoList.updateSuccessMessage,
  updateListLoading: state.todolist.updateToDoList.updateLoading,
  updateListError: state.todolist.updateToDoList.updateError,
  createItemMessage: state.todoitem.createToDoItem.createSuccessMessage,
  createItemLoading: state.todoitem.createToDoItem.createLoading,
  createItemError: state.todoitem.createToDoItem.createError,
  deleteItemMessage: state.todoitem.deleteToDoItem.deleteSuccessMessage,
  deleteItemLoading: state.todoitem.deleteToDoItem.deleteLoading,
  deleteItemError: state.todoitem.deleteToDoItem.deleteError,
  updateItemMessage: state.todoitem.updateToDoItem.updateSuccessMessage,
  updateItemLoading: state.todoitem.updateToDoItem.updateLoading,
  updateItemError: state.todoitem.updateToDoItem.updateError,
});

const styles = StyleSheet.create({
  placeholder: {flexDirection: 'row', justifyContent: 'space-between'},
});

const mapDispatchToProps = dispatch => ({
  fetchToDoList: () => dispatch(fetchToDoList()),
  deleteToDoList: targetListid => dispatch(deleteToDoList(targetListid)),
  deleteToDoItem: (listId, itemId) => dispatch(deleteToDoItem(listId, itemId)),
  updateToDoList: (listId, newTodoList) =>
    dispatch(updateToDoList(listId, newTodoList)),
  updateToDoItem: (listId, itemId, newTodoItem, newTodoItemState) =>
    dispatch(updateToDoItem(listId, itemId, newTodoItem, newTodoItemState)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);
