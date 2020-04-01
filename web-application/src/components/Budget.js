import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchBudgetList} from '../actions/budget/fetchBudgetList';
import {createBudget} from '../actions/budget/createBudget';

export const Budget = props => {
  const [newBudget, setNewBudget] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.dispatch(fetchBudgetList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.createLoading && props.createError == null) {
      props.dispatch(fetchBudgetList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.createLoading]);

  const handleEnterBudget = e => {
    setNewBudget(e.target.value);
  };

  const handleCreateBudget = () => {
    if (newBudget > 0) {
      setError(false);
      setErrorMessage('');
      props.dispatch(createBudget(newBudget));
    } else {
      setError(true);
      setErrorMessage('Budget must be greater than 0.');
    }
  };

  return !props.loading ? (
    <div>
      <h2>Budgets</h2>
      {props.budget.map(budget => (
        // eslint-disable-next-line no-underscore-dangle
        <p key={budget._id}>{budget.budget}</p>
      ))}
      <Box display="flex">
        <TextField
          id="budget-input"
          label="Enter new budget"
          error={error}
          helperText={errorMessage}
          onChange={e => handleEnterBudget(e)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreateBudget()}>
          Create budget
        </Button>
      </Box>
    </div>
  ) : (
    <CircularProgress />
  );
};

Budget.propTypes = {
  dispatch: PropTypes.func,
  budget: PropTypes.array,
  loading: PropTypes.bool,
  createMessage: PropTypes.array,
  createLoading: PropTypes.bool,
  createError: PropTypes.string,
};

const mapStateToProps = state => ({
  budget: state.budget.getBudget.budget,
  loading: state.budget.getBudget.loading,
  error: state.budget.getBudget.error,
  createMessage: state.budget.createBudget.createSuccessMessage,
  createLoading: state.budget.createBudget.createLoading,
  createError: state.budget.createBudget.createError,
});

export default connect(mapStateToProps)(Budget);
