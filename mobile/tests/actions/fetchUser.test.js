import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/fetchUser';
import {url} from '../../src/utils/globalVars';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_USER_SUCCESS when fetching user has been done', () => {
    mockAxios.onGet(url + ':5000/user').reply(200, [{username: 'Test User'}]);

    return store.dispatch(actions.fetchUser()).then(() => {
      const expectedActions = [
        {type: actions.GET_USER_BEGIN},
        {
          type: actions.GET_USER_SUCCESS,
          payload: {user: [{username: 'Test User'}]},
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USER_FAILURE when fetching user has failed', () => {
    mockAxios.onGet(url + ':5000/user').reply(500);

    return store.dispatch(actions.fetchUser()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'GET_USER_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'GET_USER_FAILURE');
    });
  });
});
