import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Flight} from '../../src/components/Flight';
import {Text, View, ListItem} from 'native-base';

Enzyme.configure({adapter: new Adapter()});

describe('Flight Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Flight
        flight={[
          {
            _id: 1,
            number: 'Test flight number ',
            date: '2020-01-01',
          },
        ]}
        loading={false}
        fetchFlight={() => {}}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text)).toHaveLength(2);
    expect(wrapper.find(View).exists()).toBe(true);
    expect(wrapper.find(ListItem).exists()).toBe(true);
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<Flight loading={true} fetchFlight={() => {}} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(false);
    expect(wrapper.find(View).exists()).toBe(false);
    expect(wrapper.find(ListItem).exists()).toBe(false);
  });
});
