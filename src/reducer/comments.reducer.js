import * as types from '../actions/types';

const initialState = {
  data: {},
  fetching: false,
  error: null
};

function commentsReducer (prevState = initialState, action) {
  switch (action.type) {
    case types.FETCH_COMMENTS_REQUEST: {
      const newState = Object.assign({}, prevState);
      newState.fetching = true;
      return newState;
    }
    case types.FETCH_COMMENTS_SUCCESS: {
      const newState = Object.assign({}, prevState);
      newState.data = normaliseData(action.data);
      newState.fetching = false;
      return newState;
    }
    case types.FETCH_COMMENTS_ERROR: {
      const newState = Object.assign({}, prevState);
      newState.error = action.error;
      newState.fetching = false;
      return newState;
    }
    default:
      return prevState;
  }
}

function normaliseData(data) {
  return data.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});
}

export default commentsReducer;