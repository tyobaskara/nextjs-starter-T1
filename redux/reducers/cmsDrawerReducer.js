import { TOGGLE_CMS_DRAWER } from '../actions/cmsDrawerActions';

const initialState = {
  isCmsDrawerOpen: false
};

const cmsDrawerReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case TOGGLE_CMS_DRAWER:
      return {...state, isCmsDrawerOpen: payload};
    default:
      return {...state};
  }
};

export default cmsDrawerReducer;
