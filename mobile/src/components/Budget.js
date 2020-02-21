import React from 'react';
import PropTypes from 'prop-types';
import {Text, TextInput, StyleSheet, Button, View} from 'react-native';
import {fetchBudgetList} from '../actions/fetchBudgetList';
import {addBudget} from '../actions/addBudget';
import {deleteBudget} from '../actions/deleteBudget';
import {connect} from 'react-redux';

export class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {requireUpdate: false};
  }

  componentDidMount() {
    this.props.fetchBudget();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.requireUpdate !== prevState.requireUpdate) {
      this.props.fetchBudget().then(() => {
        this.setState({requireUpdate: false});
      });
    }
  }

  render() {
    let total_balance = 0;
    let origin_balance = 0;
    let used_balance = 0;

    if (!this.props.loading) {
      this.props.budget.map(budget => (total_balance += budget.budget));
      this.props.budget.map(budget =>
        budget.budget > 0
          ? (origin_balance += budget.budget)
          : (used_balance += budget.budget),
      );
      return (
        <View>
          <Text>
            {' '}
            Budget: {origin_balance}, used:{used_balance}, remain:{' '}
            {total_balance}{' '}
          </Text>
          {this.props.budget.map(budget => (
            <View key={budget._id}>
              <Text> {budget.budget}</Text>
              <Button
                id={'delete ' + budget._id}
                onPress={() => {
                  this.props.deleteBudget(budget);
                  this.setState({requireUpdate: true});
                }}
                title="Delete Budget"
              />
            </View>
          ))}
          <TextInput
            style={styles.placeholder}
            placeholder="Enter new budget"
            onChangeText={textEntry => {
              this.newBudget = textEntry;
            }}
          />
          <Button
            onPress={() => {
              this.props.addBudget(this.newBudget);
              this.setState({requireUpdate: true});
            }}
            title="Add Budget"
          />
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
  successMessage: PropTypes.array,
  deleteMessage: PropTypes.array,
  uploaded: PropTypes.bool,
  deleted: PropTypes.bool,
};

const mapStateToProps = state => ({
  budget: state.budget.budget,
  loading: state.budget.loading,
  error: state.budget.error,
  uploading: state.budget.uploading,
  successMessage: state.budget.success,
  deleting: state.budget.deleting,
  deleteMessage: state.budget.deleteMessage,
  uploaded: state.budget.uploaded,
  deleted: state.budget.deleted,
});

const mapDispatchToProps = dispatch => ({
  fetchBudget: () => dispatch(fetchBudgetList()),
  addBudget: newBudget => dispatch(addBudget(newBudget)),
  deleteBudget: targetBudget => dispatch(deleteBudget(targetBudget)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#333',
    fontSize: 16,
    lineHeight: 23,
    borderBottomColor: '#333',
    borderBottomWidth: 0.5,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Budget);
