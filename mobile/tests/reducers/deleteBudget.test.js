import reducer from '../../src/reducers/deleteBudget';
import * as types from '../../src/actions/deleteBudget';

describe('getBudgetList reducer test', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      deleteMessage: '',
      deleting: true,
      error: null,
      deleted: false,
    });
  });

  it('should handle DELETE_BUDGET_BEGIN', () => {
    expect(
      reducer([], {
        type: types.DELETE_BUDGET_BEGIN,
      }),
    ).toEqual({
      deleting: true,
      error: null,
      deleted: false,
    });
  });

  it('should handle DELETE_BUDGET_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.DELETE_BUDGET_SUCCESS,
        payload: {
          data: 'Budget deleted.',
        },
      }),
    ).toEqual({
      deleting: false,
      deleteMessage: 'Budget deleted.',
      deleted: true,
    });
    expect(
      reducer(
        {deleteMessage: '', deleting: true, error: null},
        {
          type: types.DELETE_BUDGET_SUCCESS,
          payload: {
            data: 'Budget deleted.',
          },
        },
      ),
    ).toEqual({
      deleting: false,
      error: null,
      deleteMessage: 'Budget deleted.',
      deleted: true,
    });
  });

  it('should handle DELETE_BUDGET_FAILURE', () => {
    expect(
      reducer([], {
        type: types.DELETE_BUDGET_FAILURE,
        payload: {error: 'Test Error'},
      }),
    ).toEqual({
      deleteMessage: undefined,
      deleting: false,
      error: 'Test Error',
      deleted: false,
    });
    expect(
      reducer(
        {
          deleting: true,
          error: null,
          deleted: false,
        },
        {
          type: types.DELETE_BUDGET_FAILURE,
          payload: {error: 'Test Error'},
        },
      ),
    ).toEqual({
      deleting: false,
      deleted: false,
      error: 'Test Error',
    });
  });
});
