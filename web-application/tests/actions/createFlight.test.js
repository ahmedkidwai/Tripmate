import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/flight/createFlight';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('add flight actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates CREATE_FLIGHT_SUCCESS when fetching flight has been done', () => {
    mockAxios.onPost('/flight/add_api').reply(200, [
      {
        data: 'Flight added.',
      },
    ]);
    return store.dispatch(actions.createFlightAutomatically()).then(() => {
      const expectedActions = [
        {type: actions.CREATE_FLIGHT_BEGIN},
        {
          type: actions.CREATE_FLIGHT_SUCCESS,
          payload: {
            successMessage: [
              {
                data: 'Flight added.',
              },
            ],
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates CREATE_FLIGHT_FAILURE when fetching flight has failed', () => {
    mockAxios.onPost('/flight/add_api').reply(500);

    return store.dispatch(actions.createFlightAutomatically()).then(() => {
      const storeActions = store.getActions();
      expect(storeActions[0]).toHaveProperty('type', 'CREATE_FLIGHT_BEGIN');
      expect(storeActions[1]).toHaveProperty('type', 'CREATE_FLIGHT_FAILURE');
    });
  });
});
