
import cmsDrawerReducer from './cmsDrawerReducer';
import footerReducer from './footerReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  cmsDrawer: cmsDrawerReducer,
  footer: footerReducer
});

export default rootReducer;
