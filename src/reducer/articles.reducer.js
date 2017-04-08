import * as types from '../actions/types';

const initialState = {
  data: {},
  topic: 'all',
  fetching: false,
  error: null
};

function articlesReducer(prevState = initialState, action) {
  switch (action.type) {
    case types.VOTE_ARTICLE_REQUEST:
    case types.FETCH_ARTICLES_REQUEST: {
      const newState = Object.assign({}, prevState);
      
      newState.fetching = true;
      return newState;
    }
    case types.FETCH_ARTICLES_SUCCESS: {
      const newState = Object.assign({}, prevState);
      
      newState.data = normaliseData(action.data);
      newState.fetching = false;
      newState.topic = action.topic || 'all';
      return newState;
    }
    case types.VOTE_ARTICLE_SUCCESS: {
      let {article} = action.data;
      const newState = Object.assign({}, prevState);
      const newData = Object.assign({}, newState.data);
      const newArticle = Object.assign({}, newData[article._id]);

      newArticle.votes = article.votes;
      newData[article._id] = newArticle;
      newState.data = newData;
      newState.fetching = false;
      return newState;
    }
    case types.VOTE_ARTICLE_ERROR:
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

const normaliseData = (data) => {
  return data.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});
};

export default articlesReducer;