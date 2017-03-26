import * as types from './types';
import axios from 'axios';

import {ROOT} from '../../config';

export function fetchArticles() {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    axios
      .get(`${ROOT}/articles`)
      .then(res => {
        dispatch(fetchArticlesSuccess(res.data.articles));
      })
      .catch(error => {
         dispatch(fetchArticlesError(error));
      });
  };
}

export function fetchArticlesSuccess(articles) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    data: articles
  };
}

export function fetchArticlesError(error) {
  return {
    type: types.FETCH_ARTICLES_ERROR,
    error: error
  };
}

export function fetchArticlesRequest() {
  return {
    type: types.FETCH_ARTICLES_REQUEST
  };
}

export function fetchTopics() {
  return (dispatch) => {
    dispatch(fetchTopicsRequest());
    axios
      .get(`${ROOT}/topics`)
      .then(res => {
        dispatch(fetchTopicsSuccess(res.data.topics));
      })
      .catch(error => {
         dispatch(fetchTopicsError(error));
      });
  };
}

export function fetchTopicsSuccess (topics) {
  return {
    type: types.FETCH_TOPICS_SUCCESS,
    data: topics
  };
}

export function fetchTopicsError (error) {
  return {
    type: types.FETCH_TOPICS_ERROR,
    error: error
  };
}

export function fetchTopicsRequest () {
  return {
    type: types.FETCH_TOPICS_REQUEST
  };
}