import * as types from './types';
import axios from 'axios';

import {ROOT} from '../../config';

export function fetchArticles () {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    axios
      .get(`${ROOT}/articles`)
      .then(res => {
        dispatch(fetchArticlesSuccess(res.data.articles));
      })
      .catch(err => {
         dispatch(fetchArticlesError(err));
      });
  };
}

export function fetchArticlesSuccess (articles) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    data: articles
  };
}

export function fetchArticlesError (error) {
  return {
    type: types.FETCH_ARTICLES_ERROR,
    error: error
  };
}

export function fetchArticlesRequest () {
  return {
    type: types.FETCH_ARTICLES_REQUEST
  };
}