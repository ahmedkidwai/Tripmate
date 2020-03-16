import reducer from '../../src/reducers/getBudget';
import * as types from '../../src/actions/fetchBudget';

describe('getBudget reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      budget: {},
      loading: true,
      error: null,
    });
  });

  it('should handle GET_BUDGET_BEGIN', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_BUDGET_BEGIN,
        },
      ),
    ).toEqual({
      loading: true,
      error: null,
    });
  });

  it('should handle GET_BUDGET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_BUDGET_SUCCESS,
        payload: {
          budget: [
            {
              _id: '5e4f6675eddfd25ef052f9c0',
              budget: 1234,
            },
          ],
        },
      }),
    ).toEqual({
      budget: [
        {
          _id: '5e4f6675eddfd25ef052f9c0',
          budget: 1234,
        },
      ],
      loading: false,
    });
    expect(
      reducer(
        {budget: {}, loading: true, error: null},
        {
          type: types.GET_BUDGET_SUCCESS,
          payload: {
            budget: [
              {
                _id: '5e4f6675eddfd25ef052f9c0',
                budget: 1234,
              },
            ],
          },
        },
      ),
    ).toEqual({
      budget: [
        {
          _id: '5e4f6675eddfd25ef052f9c0',
          budget: 1234,
        },
      ],
      loading: false,
      error: null,
    });
  });

  it('should handle GET_BUDGET_FAILURE', () => {
    expect(
      reducer(
        {},
        {
          type: types.GET_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      budget: {},
      loading: false,
      error: 'Test Error',
    });
    expect(
      reducer(
        {
          budget: {},
          loading: true,
          error: null,
        },
        {
          type: types.GET_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      budget: {},
      loading: false,
      error: 'Test Error',
    });
  });
});
