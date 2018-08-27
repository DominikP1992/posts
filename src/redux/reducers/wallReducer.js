import types from '../types';
import { updateMessageObjects } from '../utils';

const defaultState = {
  messages: [],
  error: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_WALL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: updateMessageObjects(action.payload),
      };
    case types.FETCH_WALL_MESSAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.CLEAR_USER_DATA:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};
