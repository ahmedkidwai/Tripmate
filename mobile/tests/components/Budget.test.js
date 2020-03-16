import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Budget} from '../../src/components/Budget';
import {TextInput} from 'react-native';
import {Text, Button, View} from 'native-base';
import {Divider} from 'react-native-elements';

Enzyme.configure({adapter: new Adapter()});

describe('Budget Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Budget
        budget={[
          {
            _id: '5e4f6675eddfd25ef052f9c0',
            budget: 1234,
            expenses: [],
            createdAt: '2020-02-21T05:11:17.039Z',
            updatedAt: '2020-02-21T05:11:17.039Z',
            __v: 0,
          },
        ]}
        fetchBudget={() => {}}
        summary={{
          available: 1000,
          planned: 990,
          budget: 0,
          pending: 990,
          used: 0,
        }}
        expensesList={[]}
        loading={false}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text)).toHaveLength(8);
    expect(wrapper.find(TextInput).exists()).toBe(true);
    expect(wrapper.find(TextInput)).toHaveLength(4);
    expect(wrapper.find(View).exists()).toBe(true);
    expect(wrapper.find(Button).exists()).toBe(true);
    expect(wrapper.find(Divider).exists()).toBe(true);
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<Budget loading={true} fetchBudget={() => {}} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(false);
    expect(wrapper.find(TextInput).exists()).toBe(false);
    expect(wrapper.find(View).exists()).toBe(false);
    expect(wrapper.find(Button).exists()).toBe(false);
  });
});
