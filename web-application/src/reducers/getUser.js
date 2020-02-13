import {GET_USER_BEGIN, GET_USER_SUCCESS, GET_USER_FAILURE} from '../actions';

const initialState = {
  user: [],
  loading: true,
  error: null,
};

const getUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        user: [],
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default getUser;
