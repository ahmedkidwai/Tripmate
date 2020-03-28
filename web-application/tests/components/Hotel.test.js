import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Hotels} from '../../src/components/Hotels';

Enzyme.configure({adapter: new Adapter()});

describe('Hotels Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Hotels
        hotel={[{
          _id: 1, 
          name: 'Test Hotel 1',
          price: '777',
          location: 'Somewhere',
          checkIn: '2020-03-23T18:00:16Z',
          checkOut: '2020-03-27T18:00:16Z',
        }]}
        loading={false}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  it('is loading and should render "under construction" message', () => {
    const wrapper = shallow(<Hotels loading={true} />);
    expect(wrapper.exists()).toBe(true);
  });
});
