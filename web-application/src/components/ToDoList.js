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
  Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {fetchToDoList} from '../actions/todo/fetchToDoList';
import {createToDoList} from '../actions/todo/createToDoList';
import {deleteToDoList} from '../actions/todo/deleteToDoList';
import {updateToDoList} from '../actions/todo/updateToDoList';
import {createToDoItem} from '../actions/todo/createToDoItem';
import {deleteToDoItem} from '../actions/todo/deleteToDoItem';
import {updateToDoItem} from '../actions/todo/updateToDoItem';

export const ToDoList = props => {
  const [newToDoList, setNewToDoList] = useState('');
  const [newToDoItem, setNewToDoItem] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditList, setShowEditList] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);

  useEffect(() => {
    props.dispatch(fetchToDoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      (!props.createListLoading && props.createListError == null) ||
      (!props.createItemLoading && props.createItemError == null)
    ) {
      props.dispatch(fetchToDoList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createListLoading, props.createItemLoading]);

  useEffect(() => {
    if (
      (!props.deleteListLoading && props.deleteListError == null) ||
      (!props.deleteItemLoading && props.deleteItemError == null)
    ) {
      props.dispatch(fetchToDoList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.deleteListLoading, props.deleteItemLoading]);

  useEffect(() => {
    if (
      (!props.updateListLoading && props.updateListError == null) ||
      (!props.updateItemLoading && props.updateItemError == null)
    ) {
      props.dispatch(fetchToDoList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateListLoading, props.updateItemLoading]);

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

  const displayEditListBox = () => {
    setShowEditList(true);
  };

  const handleUpdateToDoList = listID => {
    if (newToDoList.length === 0) {
      setError(true);
      setErrorMessage('ToDoList name cannot be empty.');
    } else {
      setError(false);
      setErrorMessage('');
      setShowEditList(false);
      props.dispatch(updateToDoList(listID, newToDoList));
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

  const handleUpdateToDoItemStatus = (listID, itemID, itemContent) => event => {
    if (!itemID || !listID || itemContent.length === 0) {
      setError(true);
      setErrorMessage('ToDoItem is null.');
    } else {
      setError(false);
      setErrorMessage('');
      props.dispatch(
        updateToDoItem(listID, itemID, itemContent, event.target.checked),
      );
    }
  };

  const displayEditItemBox = () => {
    setShowEditItem(true);
  };

  const handleUpdateToDoItemContent = (listID, itemID, itemStatus) => {
    if (!itemID || !listID) {
      setError(true);
      setErrorMessage('ToDoItem is null.');
    } else {
      setError(false);
      setErrorMessage('');
      setShowEditItem(false);
      props.dispatch(updateToDoItem(listID, itemID, newToDoItem, itemStatus));
    }
  };

  return !props.loading ? (
    <div>
      <h1>ToDo List</h1>
      <Divider />
      {props.todolist.map(todolist => (
        <div key={todolist._id}>
          <Box display="flex">
            <h3>{todolist.name}</h3>
            <IconButton color="primary" onClick={() => displayEditListBox()}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => handleDeleteToDoList(todolist._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          {showEditList && (
            <Box display="flex">
              <TextField
                id="todolist-edit-input"
                label="Update todolist name"
                error={error}
                helperText={errorMessage}
                onChange={e => handleEnterToDoList(e)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleUpdateToDoList(todolist._id)}>
                Update
              </Button>
            </Box>
          )}
          {todolist.items.map(todoitem => (
            <div key={todoitem._id}>
              <Box display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todoitem.done}
                      value={todoitem._id}
                      onChange={handleUpdateToDoItemStatus(
                        todolist._id,
                        todoitem._id,
                        todoitem.content,
                      )}
                      color="primary"
                    />
                  }
                  label={todoitem.content}
                />
                <IconButton onClick={() => displayEditItemBox()}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleDeleteToDoItem(todolist._id, todoitem._id)
                  }>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              {showEditItem && (
                <Box display="flex">
                  <TextField
                    className="todoitem-edit-input"
                    label="Update todoitem name"
                    error={error}
                    helperText={errorMessage}
                    onChange={e => handleEnterToDoItem(e)}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>
                      handleUpdateToDoItemContent(
                        todolist._id,
                        todoitem._id,
                        todoitem.done,
                      )
                    }>
                    Update
                  </Button>
                </Box>
              )}
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
  createItemMessage: state.todolist.createToDoItem.createSuccessMessage,
  createItemLoading: state.todolist.createToDoItem.createLoading,
  createItemError: state.todolist.createToDoItem.createError,
  deleteItemMessage: state.todolist.deleteToDoItem.deleteSuccessMessage,
  deleteItemLoading: state.todolist.deleteToDoItem.deleteLoading,
  deleteItemError: state.todolist.deleteToDoItem.deleteError,
  updateItemMessage: state.todolist.updateToDoItem.updateSuccessMessage,
  updateItemLoading: state.todolist.updateToDoItem.updateLoading,
  updateItemError: state.todolist.updateToDoItem.updateError,
});

export default connect(mapStateToProps)(ToDoList);
