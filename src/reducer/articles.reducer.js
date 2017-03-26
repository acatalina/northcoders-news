import * as types from '../actions/types';

const initialState = {
  data: {},
  selectedTopic: null,
  fetching: false,
  error: null
};

function articlesReducer (prevState = initialState, action) {
  switch (action.type) {
    case types.FETCH_TOPICS_REQUEST: {
      const newState = Object.assign({}, prevState);
      newState.fetching = true;
      return newState;
    }
    case types.FETCH_ARTICLES_SUCCESS: {
      const newState = Object.assign({}, prevState);
      newState.data = normaliseData(action.data);
      newState.fetching = false;
      return newState;
    }
    case types.FETCH_ARTICLES_ERROR: {
      const newState = Object.assign({}, prevState);
      newState.error = action.error;
      newState.fetching = false;
      return newState;
    }
    default:
      return prevState;
  }
}

function normaliseData (data) {
  return data.reduce(function (acc, item) {
    acc[item._id] = item;
    return acc;
  }, {});
}

export function getTopArticles (state, num) {
  return Object.keys(state.articles.data)
    .reduce(function (acc, id) {
      return acc.concat(state.articles.data[id]);
    }, [])
    .sort(function (a, b) {
      return b.votes - a.votes;
    })
    .slice(0, num);
}

export default articlesReducer;