import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/deleteTicket';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('delete ticket actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates DELETE_TICKET_FAILURE when deleting ticket has failed', () => {
    mockAxios.onDelete('/ticket').reply(500);

    return store.dispatch(actions.deleteTicket()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'DELETE_TICKET_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'DELETE_TICKET_FAILURE');
    });
  });
});
