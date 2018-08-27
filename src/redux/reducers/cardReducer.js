import types from '../types';
import { updateMessageObject } from '../utils';

const defaultState = {
  messages: [],
  error: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: updateMessageObject(action.payload),
      };
    case types.FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.CLEAR_MESSAGE:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};
