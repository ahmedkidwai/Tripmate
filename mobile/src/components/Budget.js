import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet} from 'react-native';
import {Text, Button, View} from 'native-base';
import {fetchBudgetList} from '../actions/fetchBudgetList';
import {addBudget} from '../actions/addBudget';
import {deleteBudget} from '../actions/deleteBudget';
import {fetchExpenseSummary} from '../actions/fetchExpenseSummary';
import {connect} from 'react-redux';
import {fetchExpensesList} from '../actions/fetchExpensesList';
import {Divider} from 'react-native-elements';

export class Budget extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBudget();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.uploading !== this.props.uploading ||
      prevProps.deleting !== this.props.deleting
    ) {
      this.props.fetchBudget();
    }

    if (
      prevProps.loading !== this.props.loading &&
      this.props.budget.length > 0
    ) {
      this.props.fetchExpenseSummary(this.props.budget[0]._id);
      this.props.fetchExpensesList(this.props.budget[0]._id);
    }
  }

  handleAddBudget(newBudget) {
    this.props.addBudget(newBudget);
  }

  handleDeleteBudget(targetBudget) {
    this.props.deleteBudget(targetBudget);
  }

  handleGenerateBudgetList(targetBudget) {
    return targetBudget.map(budget => (
      <View key={budget._id}>
        <Text> {budget.budget}</Text>
        <Button
          danger
          id={'delete ' + budget._id}
          onPress={() => {
            this.handleDeleteBudget(budget);
          }}>
          <Text>Delete Budget</Text>
        </Button>
      </View>
    ));
  }

  handleGenerateBudgetSummary() {
    return (
      <View>
        <View>
          <Text>Budget: {this.props.summary.budget}</Text>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text>
            available:{this.props.summary.available}
            pending:{this.props.summary.pending}
          </Text>
        </View>
        <View>
          <Text>
            used: {this.props.summary.used}
            planned: {this.props.summary.planned}
          </Text>
        </View>
      </View>
    );
  }
  handleParseDate(date) {
    var newDate = new Date(date);
    var month = newDate.getMonth() + 1;
    return newDate.getFullYear() + ' - ' + month + ' - ' + newDate.getDate();
  }
  handleGenerateExpensesList() {
    return this.props.expensesList.map(expenses => (
      <View key={expenses._id}>
        <Text
          style={[
            expenses.isDone ? styles.expensesDone : styles.expensesUnDone,
            styles.summarySize,
          ]}>
          {this.handleParseDate(expenses.date)}, {expenses.name},{' '}
          {expenses.amount}
        </Text>
      </View>
    ));
  }

  render() {
    if (!this.props.loading) {
      return (
        <View>
          {this.handleGenerateBudgetSummary()}
          <Divider style={styles.divider} />
          {this.handleGenerateExpensesList()}
          <Divider style={styles.divider} />
          {this.handleGenerateBudgetList(this.props.budget)}
          <Divider style={styles.divider} />
          <TextInput
            style={styles.placeholder}
            placeholder="Enter new budget"
            onChangeText={textEntry => {
              this.newBudget = textEntry;
            }}
          />
          <Button
            success
            onPress={() => {
              this.handleAddBudget(this.newBudget);
            }}>
            <Text>Add Budget</Text>
          </Button>
        </View>
      );
    } else {
      return null;
    }
  }
}

Budget.Prototype = {
  fetchBudget: PropTypes.func,
  addBudget: PropTypes.func,
  deleteBudget: PropTypes.func,
  budget: PropTypes.array,
  loading: PropTypes.bool,
  uploading: PropTypes.bool,
  deleting: PropTypes.bool,
  successMessage: PropTypes.string,
  deleteMessage: PropTypes.string,
  uploaded: PropTypes.bool,
  deleted: PropTypes.bool,

  fetchExpenseSummary: PropTypes.func,
  fetchExpensesList: PropTypes.func,
  summary: PropTypes.Object,
  summaryLoading: PropTypes.bool,
  summaryError: PropTypes.string,
  //get sorted expenses
  expensesList: PropTypes.array,
  expensesLoading: PropTypes.bool,
  expensesError: PropTypes.string,
};

const mapStateToProps = state => ({
  //fetch budget list
  budget: state.budget.getBudgetList.budget,
  loading: state.budget.getBudgetList.loading,
  error: state.budget.getBudgetList.error,
  //add budget
  uploading: state.budget.addBudget.uploading,
  successMessage: state.budget.addBudget.successMessage,
  uploaded: state.budget.addBudget.uploaded,
  //delete budget
  deleting: state.budget.deleteBudget.deleting,
  deleteMessage: state.budget.deleteBudget.deleteMessage,
  deleted: state.budget.deleteBudget.deleted,
  //get budget expenses summary
  summary: state.budget.summary.summary,
  summaryLoading: state.budget.summary.summaryLoading,
  summaryError: state.budget.summary.summaryError,
  //get sorted expenses
  expensesList: state.budget.getExpensesList.expensesList,
  expensesLoading: state.budget.getExpensesList.loading,
  expensesError: state.budget.getExpensesList.error,
});

const mapDispatchToProps = dispatch => ({
  fetchBudget: () => dispatch(fetchBudgetList()),
  addBudget: newBudget => dispatch(addBudget(newBudget)),
  deleteBudget: targetBudget => dispatch(deleteBudget(targetBudget)),
  fetchExpenseSummary: id => dispatch(fetchExpenseSummary(id)),
  fetchExpensesList: id => dispatch(fetchExpensesList(id)),
});

const styles = StyleSheet.create({
  placeholder: {
    color: '#333',
    fontSize: 16,
    lineHeight: 23,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },

  expensesDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  expensesUnDone: {
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  divider: {backgroundColor: 'orange'},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Budget);
