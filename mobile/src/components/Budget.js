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
import {updateBudget} from '../actions/updateBudget';
import {Divider} from 'react-native-elements';
import {addExpenses} from '../actions/addExpenses';

export class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {updateBudgetStatus: false};
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
    if (
      prevProps.budgetUpdating !== this.props.budgetUpdating &&
      this.props.budget.length > 0
    ) {
      this.props.fetchBudget();
      this.props.fetchExpenseSummary(this.props.budget[0]._id);
    }
    if (
      prevProps.expensesUploading !== this.props.expensesUploading &&
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

  handleBudgetUpdate(id, newBudget) {
    this.props.updateBudget(id, newBudget);
    this.setState({updateBudgetStatus: false});
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

  handleAddExpenses(id, newExpenses) {
    this.props.addExpenses(id, newExpenses);
  }

  handleRenderAddExpenses() {
    return (
      <View>
        <TextInput
          style={styles.placeholder}
          placeholder="Enter new Expenses Name"
          onChangeText={textEntry => {
            this.newName = textEntry;
          }}
        />
        <TextInput
          style={styles.placeholder}
          placeholder="Enter new Expenses amount"
          onChangeText={textEntry => {
            this.newAmount = textEntry;
          }}
        />
        <TextInput
          style={styles.placeholder}
          placeholder="Enter new Expenses date"
          onChangeText={textEntry => {
            this.newDate = textEntry;
          }}
        />

        <Button
          Success
          onPress={() => {
            this.handleAddExpenses(this.props.budget[0]._id, {
              name: this.newName,
              amount: this.newAmount,
              date: this.newDate,
              isDone: false,
            });
          }}>
          <Text> ADD expenses </Text>
        </Button>
      </View>
    );
  }

  handleBudgetRender() {
    if (this.state.updateBudgetStatus === false) {
      return (
        <View>
          <Button
            Success
            id={this.props.budget[0]._id}
            onPress={() => {
              this.setState({updateBudgetStatus: true});
            }}>
            <Text> {this.props.budget[0].budget} </Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View>
          <TextInput
            style={styles.placeholder}
            placeholder="Enter new budget"
            onChangeText={textEntry => {
              this.newBudget = textEntry;
            }}
          />
          <Button
            Success
            onPress={() => {
              this.handleBudgetUpdate(this.props.budget[0]._id, this.newBudget);
            }}>
            <Text> UPDATE </Text>
          </Button>
        </View>
      );
    }
  }

  handleGenerateBudgetSummary() {
    return (
      <View>
        <View>{this.handleBudgetRender()}</View>

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
          {this.handleRenderAddExpenses()}
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

  fetchExpenseSummary: PropTypes.func,
  fetchExpensesList: PropTypes.func,
  summary: PropTypes.Object,
  summaryLoading: PropTypes.bool,
  summaryError: PropTypes.string,
  //get sorted expenses
  expensesList: PropTypes.array,
  expensesLoading: PropTypes.bool,
  expensesError: PropTypes.string,

  //update budget
  budgetUpdating: PropTypes.bool,
  updateSuccessMessage: PropTypes.string,

  //add expenses
  expensesUploading: PropTypes.bool,
  expensesAddSuccessMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  //fetch budget list
  budget: state.budget.getBudgetList.budget,
  loading: state.budget.getBudgetList.loading,
  error: state.budget.getBudgetList.error,
  //add budget
  uploading: state.budget.addBudget.uploading,
  successMessage: state.budget.addBudget.successMessage,

  //delete budget
  deleting: state.budget.deleteBudget.deleting,
  deleteMessage: state.budget.deleteBudget.deleteMessage,

  //get budget expenses summary
  summary: state.budget.summary.summary,
  summaryLoading: state.budget.summary.summaryLoading,
  summaryError: state.budget.summary.summaryError,
  //get sorted expenses
  expensesList: state.budget.getExpensesList.expensesList,
  expensesLoading: state.budget.getExpensesList.loading,
  expensesError: state.budget.getExpensesList.error,
  //update budget
  budgetUpdating: state.budget.updateBudget.uploading,
  updateSuccessMessage: state.budget.updateBudget.successMessage,
  //add expenses
  expensesUploading: state.budget.addExpenses.uploading,
  expensesAddSuccessMessage: state.budget.addExpenses.successMessage,
});

const mapDispatchToProps = dispatch => ({
  fetchBudget: () => dispatch(fetchBudgetList()),
  addBudget: newBudget => dispatch(addBudget(newBudget)),
  deleteBudget: targetBudget => dispatch(deleteBudget(targetBudget)),
  fetchExpenseSummary: id => dispatch(fetchExpenseSummary(id)),
  fetchExpensesList: id => dispatch(fetchExpensesList(id)),
  updateBudget: (id, newBudget) => dispatch(updateBudget(id, newBudget)),
  addExpenses: (id, newExpenses) => dispatch(addExpenses(id, newExpenses)),
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
