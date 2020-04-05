import get from 'lodash/get';

export const getErrorMessage = (error) => {
  const errorResponse = get(error, 'response.data.message', '');
  const errorMessage = get(error, 'message', '');
  const commonError = errorMessage ? errorMessage : 'Something Went Wrong';

  return errorResponse ? errorResponse : commonError;
};
