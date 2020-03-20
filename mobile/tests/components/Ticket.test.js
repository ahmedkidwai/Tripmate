import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Ticket} from '../../src/components/Ticket';
import {Text, View, ListItem} from 'native-base';

Enzyme.configure({adapter: new Adapter()});

describe('Ticket Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Ticket
        ticket={[
          {
            _id: 1,
            transportType: 'Test trasnsport type',
            start: {location: 'Test start location', date: 'Test start date'},
            end: {location: 'Test end location', date: 'Test end date'},
          },
        ]}
        loading={false}
        fetchTicket={() => {}}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text)).toHaveLength(10);
    expect(wrapper.find(View).exists()).toBe(true);
    expect(wrapper.find(ListItem).exists()).toBe(true);
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<Ticket loading={true} fetchTicket={() => {}} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(false);
    expect(wrapper.find(View).exists()).toBe(false);
    expect(wrapper.find(ListItem).exists()).toBe(false);
  });
});
