import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Budget} from '../../src/components/Budget';

Enzyme.configure({adapter: new Adapter()});

describe('User Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Budget
        budget={[
          {_id: 1, budget: 1234},
          {_id: 2, budget: 4567},
        ]}
        loading={false}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.find(Box).exists()).toBe(true);
    expect(wrapper.find(TextField).exists()).toBe(true);
    expect(wrapper.find(Button).exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Budgets');
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<Budget loading={true} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(CircularProgress).exists()).toBe(true);
  });
});
