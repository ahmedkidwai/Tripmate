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
        hotel={[
          {_id: 1, hotelname: 'Test Hotel 1'},
          {_id: 2, hotelname: 'Test Hotel 2'},
          {_id: 3, hotelname: 'Test Hotel 3'},
        ]}
        loading={false}
      />,
    );

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h2').exists()).toBe(true);
    expect(
      wrapper
        .find('p')
        .at(0)
        .text(),
    ).toBe('Test Hotel 1');
    expect(
      wrapper
        .find('p')
        .at(1)
        .text(),
    ).toBe('Test Hotel 2');
    expect(
      wrapper
        .find('p')
        .at(2)
        .text(),
    ).toBe('Test Hotel 3');
  });
  it('is loading and should render "under construction" message', () => {
    const wrapper = shallow(<Hotels loading={true} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('p').exists()).toBe(true);
  });
});
