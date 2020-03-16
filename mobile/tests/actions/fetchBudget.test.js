import configureMockStore from 'redux-mock-store';
import trunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/fetchBudget';
import {url} from '../../src/utils/globalVars';

const middleware = [trunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch budget actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_BUDGET_SUCCESS when fetching budget has been done', () => {
    mockAxios.onGet(url + '/budget/5e4f6675eddfd25ef052f9c0').reply(200, {
      _id: '5e4f6675eddfd25ef052f9c0',
      budget: 1234,
      createdAt: '2020-02-21T05:11:17.039Z',
      updatedAt: '2020-02-21T05:11:17.039Z',
      __v: 0,
    });
    return store
      .dispatch(actions.fetchBudget('5e4f6675eddfd25ef052f9c0'))
      .then(() => {
        const expectedActions = [
          {type: actions.GET_BUDGET_BEGIN},
          {
            type: actions.GET_BUDGET_SUCCESS,
            payload: {
              budget: {
                _id: '5e4f6675eddfd25ef052f9c0',
                budget: 1234,
                createdAt: '2020-02-21T05:11:17.039Z',
                updatedAt: '2020-02-21T05:11:17.039Z',
                __v: 0,
              },
            },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_BUDGET_FAILURE when fetching budget has failed', () => {
    mockAxios.onGet(url + '/budget/5e4f6675eddfd25ef052f9c0').reply(500);

    return store.dispatch(actions.fetchBudget()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'GET_BUDGET_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'GET_BUDGET_FAILURE');
    });
  });
});
