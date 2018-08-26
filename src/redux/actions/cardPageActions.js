import axios from 'axios';

import types from '../types';

import {
  apiUrl,
  apiKey,
  recordPerPage,
  dataFormat,
  userPhotosMethod,
} from '../../constants/apiConstants';

const URL = `${apiUrl}&method=${userPhotosMethod}&api_key=${apiKey}&format=${dataFormat}&per_page=${recordPerPage}&nojsoncallback=1`;

function fetchUserPhotosRequest() {
  return {
    type: types.FETCH_WALL_MESSAGES_REQUEST,
  };
}

function fetchUserPhotosSuccess(fetchedData) {
  return {
    type: types.FETCH_WALL_MESSAGES_SUCCESS,
    payload: fetchedData,
  };
}

function fetchUserPhotosFailure(res) {
  return {
    type: types.FETCH_WALL_MESSAGES_FAILURE,
    payload: res,
  };
}

export function fetchUserPhotos(userId, pageNumber) {
  return (dispatch) => {
    dispatch(fetchUserPhotosRequest());
    return axios
      .get(`${URL}&user_id=${userId}&page=${pageNumber}`)
      .then((res) => {
        if (res.data && res.data.stat === 'ok') {
          return dispatch(fetchUserPhotosSuccess(res.data.photos.photo));
        }
        dispatch(fetchUserPhotosFailure(res));
        return false;
      });
  };
}

export function clearUserData() {
  return { type: types.CLEAR_USER_DATA };
}
