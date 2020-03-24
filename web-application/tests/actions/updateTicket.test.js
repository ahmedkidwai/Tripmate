import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/updateTicket';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update ticket actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  
  it('creates UPDATE_TICKET_FAILURE when updating ticket has failed', () => {
    const testTicketID = 12345;
    mockAxios.onPost(`/ticket/update/${testTicketID}`).reply(500);
    
    return store.dispatch(actions.updateTicket()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_TICKET_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_TICKET_FAILURE');
    });
  });
});
