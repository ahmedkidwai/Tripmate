import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Ticket} from '../../src/components/ticket/Ticket';

Enzyme.configure({adapter: new Adapter()});

describe('Ticket Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Ticket ticket={[{_id:1,
                        transportType: 'Test Ticket',
                        start: {
                          location: 'Test Start Location',
                          date: 'Test Start Date',
                        },
                        end: {
                          location: 'Test End Location',
                          date: 'Test End Date',
                          },
                        confirmationNumber: 'Test Confirmation Number',
                        notes: 'Test notes',
                      }]} loading={false} />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.findWhere(ticket => ticket.type() === 'p' && ticket === 'Test Ticket'));
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<Ticket loading={true} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(false);
    expect(wrapper.find('p').exists()).toBe(false);
  });
});
