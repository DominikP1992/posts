import chunk from 'lodash/chunk';
import { createSelector } from 'reselect';

// simple selector
export const dataSelector = createSelector(
  data => data,
  photos => chunk(photos, 3),
);

export const changeSelector = createSelector(inputData => inputData, data => data);

