import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {fetchToDoList} from '../actions/todolist';

export const ToDoList = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchToDoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <div>
      <h1>ToDo List</h1>
      {props.todolist.map((todolist, _id) => (
        <div key={_id}>
          <h3>{todolist.name}</h3>
          {todolist.items.map(todoitem => (
            <div key={_id}>
              <li>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={todoitem.done}
                      value={_id}
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
    </div>
  ) : null;
};

ToDoList.propTypes = {
  dispatch: PropTypes.func,
  todolist: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  todolist: state.todolist.todolist,
  loading: state.todolist.loading,
  error: state.todolist.error,
});

export default connect(mapStateToProps)(ToDoList);
