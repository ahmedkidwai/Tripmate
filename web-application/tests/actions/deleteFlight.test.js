import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/deleteFlight';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete flight actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_FLIGHT_FAILURE when deleting flight has failed', () => {
    mockAxios.onDelete('/flight').reply(500);

    return store.dispatch(actions.deleteFlight()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_FLIGHT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_FLIGHT_FAILURE');
    });
  });
});
