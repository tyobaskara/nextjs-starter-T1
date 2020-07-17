import { SET_FOOTER_DATA } from '@redux/actions/footerActions';

const initialState = {
  data: {}
};

const cmsDrawerReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case SET_FOOTER_DATA:
      return {...state, data: payload};
    default:
      return {...state};
  }
};

export default cmsDrawerReducer;
