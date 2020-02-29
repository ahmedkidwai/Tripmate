import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {ToDoList} from '../../src/components/ToDoList';

Enzyme.configure({adapter: new Adapter()});

describe('ToDoList Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <ToDoList todolist={[{name: 'Test ToDo List', items: []}]} loading={false} />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Test ToDo List');
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<ToDoList loading={true} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(false);
    expect(wrapper.find('h3').exists()).toBe(false);
  });
});
