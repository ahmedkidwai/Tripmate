import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/budget/fetchBudget';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_BUDGET_SUCCESS when fetching user has been done', () => {
    mockAxios.onGet('/budget').reply(200, [{budget: 1234}]);

    return store.dispatch(actions.fetchBudget()).then(() => {
      const expectedActions = [
        {type: actions.GET_BUDGET_BEGIN},
        {
          type: actions.GET_BUDGET_SUCCESS,
          payload: {budget: [{budget: 1234}]},
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_BUDGET_FAILURE when fetching user has failed', () => {
    mockAxios.onGet('/budget').reply(500);

    return store.dispatch(actions.fetchBudget()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'GET_BUDGET_BEGIN');
      expect(actions[1]).toHaveProperty('type', 'GET_BUDGET_FAILURE');
    });
  });
});
