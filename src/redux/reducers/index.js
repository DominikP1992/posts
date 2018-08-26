import { combineReducers } from 'redux';

// parts of state
import wallData from './wallReducer';
import cardData from './cardReducer';

// combine all reducers
const rootReducer = combineReducers({
  wallData,
  cardData,
});

export default rootReducer;
