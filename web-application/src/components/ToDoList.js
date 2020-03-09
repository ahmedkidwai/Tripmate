import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  IconButton,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {fetchToDoList} from '../actions/fetchToDoList';
import {createToDoList} from '../actions/createToDoList';
import {deleteToDoList} from '../actions/deleteToDoList';
import {createToDoItem} from '../actions/createToDoItem';
import {deleteToDoItem} from '../actions/deleteToDoItem';

export const ToDoList = props => {
  const [newToDoList, setNewToDoList] = useState(0);
  const [newToDoItem, setNewToDoItem] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.dispatch(fetchToDoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      (!props.createListLoading && props.createListError == null) ||
      (!props.deleteListLoading && props.deleteListError == null) ||
      (!props.createItemLoading && props.createItemError == null) ||
      (!props.deleteItemLoading && props.deleteItemError == null)
    ) {
      props.dispatch(fetchToDoList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.createListLoading,
    props.deleteListLoading,
    props.createItemLoading,
    props.deleteItemLoading,
  ]);

  const handleEnterToDoList = e => {
    setNewToDoList(e.target.value);
  };

  const handleCreateToDoList = () => {
    if (newToDoList.length === 0) {
      setError(true);
      setErrorMessage('ToDoList name cannot be empty.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(createToDoList(newToDoList));
    }
  };

  const handleDeleteToDoList = listID => {
    if (!listID) {
      setError(true);
      setErrorMessage('ToDoList is null.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(deleteToDoList(listID));
    }
  };

  const handleEnterToDoItem = e => {
    setNewToDoItem(e.target.value);
  };

  const handleCreateToDoItem = listID => {
    if (newToDoItem.length === 0) {
      setError(true);
      setErrorMessage('ToDoItem name cannot be empty.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(createToDoItem(listID, newToDoItem));
    }
  };

  const handleDeleteToDoItem = (listID, itemID) => {
    if (!listID || !itemID) {
      setError(true);
      setErrorMessage('ToDoItem is null.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(deleteToDoItem(listID, itemID));
    }
  };

  return !props.loading ? (
    <div>
      <h1>ToDo List</h1>
      {props.todolist.map(todolist => (
        <div key={todolist._id}>
          <Box display="flex">
            <h3>{todolist.name}</h3>
            <IconButton
              color="primary"
              onClick={() => handleDeleteToDoList(todolist._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          {todolist.items.map(todoitem => (
            <div key={todoitem._id}>
              <Box display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todoitem.done}
                      value={todoitem._id}
                      color="primary"
                    />
                  }
                  label={todoitem.content}
                />
                <IconButton
                  onClick={() =>
                    handleDeleteToDoItem(todolist._id, todoitem._id)
                  }>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </div>
          ))}
          <Box display="flex">
            <TextField
              className="todoitem-input"
              label="Enter new todoitem"
              error={error}
              helperText={errorMessage}
              onChange={e => handleEnterToDoItem(e)}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleCreateToDoItem(todolist._id)}>
              Create ToDo Item
            </Button>
          </Box>
          <br />
        </div>
      ))}
      <div>
        <br />
        <Box display="flex">
          <TextField
            id="todolist-input"
            label="Enter new todolist"
            error={error}
            helperText={errorMessage}
            onChange={e => handleEnterToDoList(e)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleCreateToDoList()}>
            Create ToDo List
          </Button>
        </Box>
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

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
  createItemMessage: PropTypes.string,
  createItemLoading: PropTypes.bool,
  createItemError: PropTypes.string,
  deleteItemMessage: PropTypes.string,
  deleteItemLoading: PropTypes.bool,
  deleteItemError: PropTypes.string,
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
  createItemMessage: state.todolist.createToDoItem.createSuccessMessage,
  createItemLoading: state.todolist.createToDoItem.createLoading,
  createItemError: state.todolist.createToDoItem.createError,
  deleteItemMessage: state.todolist.deleteToDoItem.deleteSuccessMessage,
  deleteItemLoading: state.todolist.deleteToDoItem.deleteLoading,
  deleteItemError: state.todolist.deleteToDoItem.deleteError,
});

export default connect(mapStateToProps)(ToDoList);
