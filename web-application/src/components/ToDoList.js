import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import {fetchToDoList} from '../actions/fetchToDoList';
import {createToDoList} from '../actions/createToDoList';
import {deleteToDoList} from '../actions/deleteToDoList';

export const ToDoList = props => {
  const [newToDoList, setNewToDoList] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.dispatch(fetchToDoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      (!props.createLoading && props.createError == null) ||
      (!props.deleteLoading && props.deleteError == null)
    ) {
      props.dispatch(fetchToDoList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createLoading, props.deleteLoading]);

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

  return !props.loading ? (
    <div>
      <h1>ToDo List</h1>
      {props.todolist.map(todolist => (
        <div key={todolist._id}>
          <h3>{todolist.name}</h3>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteToDoList(todolist._id)}>
            Delete
          </Button>
          {todolist.items.map(todoitem => (
            <div key={todoitem._id}>
              <li>
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
              </li>
            </div>
          ))}
        </div>
      ))}
      <div>
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
            onClick={() => handleCreateToDoList()}>
            Create ToDoList
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
  createMessage: PropTypes.string,
  createLoading: PropTypes.bool,
  createError: PropTypes.string,
  deleteMessage: PropTypes.string,
  deleteLoading: PropTypes.bool,
  deleteError: PropTypes.string,
};

const mapStateToProps = state => ({
  todolist: state.todolist.getToDoList.todolist,
  loading: state.todolist.getToDoList.loading,
  error: state.todolist.getToDoList.error,
  createMessage: state.todolist.createToDoList.createSuccessMessage,
  createLoading: state.todolist.createToDoList.createLoading,
  createError: state.todolist.createToDoList.createError,
  deleteMessage: state.todolist.deleteToDoList.deleteSuccessMessage,
  deleteLoading: state.todolist.deleteToDoList.deleteLoading,
  deleteError: state.todolist.deleteToDoList.deleteError,
});

export default connect(mapStateToProps)(ToDoList);
