import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {User} from '../../src/components/User';

Enzyme.configure({adapter: new Adapter()});

describe('User Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <User user={[{username: 'Test User'}]} loading={false} />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('p').text()).toBe('Test User');
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<User loading={true} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(false);
    expect(wrapper.find('p').exists()).toBe(false);
  });
});
