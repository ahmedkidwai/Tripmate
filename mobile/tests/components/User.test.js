import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {User} from '../../src/components/User';
import {Text} from 'react-native';

Enzyme.configure({adapter: new Adapter()});

describe('User Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <User
        user={[{username: 'Test User'}]}
        loading={false}
        fetchUser={() => {}}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text)).toHaveLength(1);
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<User loading={true} fetchUser={() => {}} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(false);
  });
});
