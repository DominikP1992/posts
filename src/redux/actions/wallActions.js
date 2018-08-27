import axios from 'axios';

import types from '../types';

import { apiUrl } from '../../constants/apiConstants';

function fetchWallMessagesRequest() {
  return {
    type: types.FETCH_WALL_MESSAGES_REQUEST,
  };
}

function fetchWallMessagesSuccess(fetchedData) {
  return {
    type: types.FETCH_WALL_MESSAGES_SUCCESS,
    payload: fetchedData,
  };
}

function fetchWallMessagesFailure(res) {
  return {
    type: types.FETCH_WALL_MESSAGES_FAILURE,
    payload: res,
  };
}

export function fetchWallMessages() {
  return (dispatch) => {
    dispatch(fetchWallMessagesRequest());
    return axios
      .get(apiUrl)
      .then((res) => {
        if (res.status && res.status === 200) {
          return dispatch(fetchWallMessagesSuccess(res.data));
        }
        return dispatch(fetchWallMessagesFailure('error'));
      })
      .catch(() => dispatch(fetchWallMessagesFailure('error')));
  };
}
