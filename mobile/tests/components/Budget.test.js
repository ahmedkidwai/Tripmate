import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Budget} from '../../src/components/Budget';
import {Text, TextInput, Button, View} from 'react-native';

Enzyme.configure({adapter: new Adapter()});

describe('Budget Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Budget
        budget={[
          {
            _id: '5e4f6675eddfd25ef052f9c0',
            budget: 1234,
            createdAt: '2020-02-21T05:11:17.039Z',
            updatedAt: '2020-02-21T05:11:17.039Z',
            __v: 0,
          },
        ]}
        loading={false}
        fetchBudget={() => {}}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text)).toHaveLength(2);
    expect(wrapper.find(TextInput).exists()).toBe(true);
    expect(wrapper.find(TextInput)).toHaveLength(1);
    expect(wrapper.find(View).exists()).toBe(true);
    expect(wrapper.find(Button).exists()).toBe(true);
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
