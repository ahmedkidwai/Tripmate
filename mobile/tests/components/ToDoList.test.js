import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {ToDoList} from '../../src/components/ToDoList';
import {Text, Button, View, Input} from 'native-base';

Enzyme.configure({adapter: new Adapter()});

describe('ToDoList Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <ToDoList
        todolist={[
          {
            _id: 1,
            name: 'Test todo list',
            items: [],
          },
        ]}
        loading={false}
        fetchToDoList={() => {}}
      />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(true);
    expect(wrapper.find(Text)).toHaveLength(2);
    expect(wrapper.find(Input).exists()).toBe(false);
    expect(wrapper.find(View).exists()).toBe(true);
    expect(wrapper.find(Button).exists()).toBe(true);
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(
      <ToDoList loading={true} fetchToDoList={() => {}} />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Text).exists()).toBe(false);
    expect(wrapper.find(Input).exists()).toBe(false);
    expect(wrapper.find(View).exists()).toBe(false);
    expect(wrapper.find(Button).exists()).toBe(false);
  });
});
