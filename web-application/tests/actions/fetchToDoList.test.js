import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/todolist';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_TODO_LIST_SUCCESS when fetching todolist has been done', () => {
    mockAxios.onGet('/todolist').reply(200, [{name: 'Test ToDo List'}]);

    return store.dispatch(actions.fetchToDoList()).then(() => {
      const expectedActions = [
        {type: actions.GET_TODO_LIST_BEGIN},
        {
          type: actions.GET_TODO_LIST_SUCCESS,
          payload: {todolist: [{name: 'Test ToDo List'}]},
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_TODO_LIST_FAILURE when fetching todolist has failed', () => {
    mockAxios.onGet('/todolist').reply(500);

    return store.dispatch(actions.fetchToDoList()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'GET_TODO_LIST_BEGIN');
      expect(actions[1]).toHaveProperty('type', 'GET_TODO_LIST_FAILURE');
    });
  });
});
