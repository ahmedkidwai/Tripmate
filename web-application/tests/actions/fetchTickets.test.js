import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/ticket/fetchTicket';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_TICKET_SUCCESS when fetching ticket has been done', () => {
    mockAxios.onGet('/ticket').reply(200, [{name: 'Test Ticket'}]);

    return store.dispatch(actions.fetchTicket()).then(() => {
      const expectedActions = [
        {type: actions.GET_TICKET_BEGIN},
        {
          type: actions.GET_TICKET_SUCCESS,
          payload: {ticket: [{name: 'Test Ticket'}]},
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_TICKET_FAILURE when fetching ticket has failed', () => {
    mockAxios.onGet('/ticket').reply(500);

    return store.dispatch(actions.fetchTicket()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'GET_TICKET_BEGIN');
      expect(actions[1]).toHaveProperty('type', 'GET_TICKET_FAILURE');
    });
  });
});
