
import cmsDrawerReducer from './cmsDrawerReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  cmsDrawer: cmsDrawerReducer
});

export default rootReducer;
