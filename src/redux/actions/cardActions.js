import axios from 'axios';
import types from '../types';

import { apiUrl } from '../../constants/apiConstants';

function fetchMessageRequest() {
  return {
    type: types.FETCH_MESSAGE_REQUEST,
  };
}

function fetchMessageSuccess(message) {
  return {
    type: types.FETCH_MESSAGE_SUCCESS,
    payload: message,
  };
}

function fetchMessageFailure(res) {
  return {
    type: types.FETCH_MESSAGE_FAILURE,
    payload: res,
  };
}

export function fetchMessage(id) {
  return (dispatch) => {
    dispatch(fetchMessageRequest());
    return axios
      .get(`${apiUrl}/${id}`)
      .then((res) => {
        if (res.status && res.status === 200) {
          return dispatch(fetchMessageSuccess(res.data));
        }
        return dispatch(fetchMessageFailure('error'));
      })
      .catch(() => dispatch(fetchMessageFailure('error')));
  };
}

export function clearMessage() {
  return { type: types.CLEAR_MESSAGE };
}
