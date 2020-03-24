import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/updateFlight';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('update flight actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  
  it('creates UPDATE_FLIGHT_FAILURE when updating flight has failed', () => {
    const testFlightID = 12345;
    mockAxios.onPost(`/flight/update/${testFlightID}`).reply(500);
    
    return store.dispatch(actions.updateFlight()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'UPDATE_FLIGHT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'UPDATE_FLIGHT_FAILURE');
    });
  });
});
