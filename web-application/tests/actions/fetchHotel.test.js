import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import expect from 'expect';
import * as actions from '../../src/actions/hotel/fetchHotel';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);
const store = mockStore({});

describe('fetch hotel actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('creates GET_HOTEL_SUCCESS when fetching hotel has been done', () => {
    mockAxios.onGet('/hotel').reply(200, [{hotelname: 'Test Hotel'}]);

    return store.dispatch(actions.fetchHotel()).then(() => {
      const expectedActions = [
        {type: actions.GET_HOTEL_BEGIN},
        {
          type: actions.GET_HOTEL_SUCCESS,
          payload: {hotel: [{hotelname: 'Test Hotel'}]},
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_HOTEL_FAILURE when fetching hotel has failed', () => {
    mockAxios.onGet('/hotel').reply(500);

    return store.dispatch(actions.fetchHotel()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'GET_HOTEL_BEGIN');
      expect(actions[1]).toHaveProperty('type', 'GET_HOTEL_FAILURE');
    });
  });
});
