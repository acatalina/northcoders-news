import * as types from './types';
import axios from 'axios';

import {ROOT} from '../../config';

export function fetchArticles(topic) {
  return (dispatch) => {
    let URL = `${ROOT}/articles`;
    
    if (topic && topic !== 'all') {
      URL = `${ROOT}/topics/${topic}/articles`;
    }

    dispatch(fetchArticlesRequest());
    axios
      .get(URL)
      .then(res => {
        dispatch(fetchArticlesSuccess(res.data.articles, topic));
      })
      .catch(error => {
         dispatch(fetchArticlesError(error));
      });
  };
}

export function fetchArticlesSuccess(articles, topic) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    data: articles,
    topic: topic
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

export function fetchComments(article_id) {
  return (dispatch) => {
    dispatch(fetchCommentsRequest());
    axios
      .get(`${ROOT}/articles/${article_id}/comments`)
      .then(res => {
        dispatch(fetchCommentsSuccess(res.data.comments));
      })
      .catch(error => {
         dispatch(fetchCommentsError(error));
      });
  };
}

export function fetchCommentsSuccess(comments) {
  return {
    type: types.FETCH_COMMENTS_SUCCESS,
    data: comments
  };
}

export function fetchCommentsError(error) {
  return {
    type: types.FETCH_COMMENTS_ERROR,
    error: error
  };
}

export function fetchCommentsRequest() {
  return {
    type: types.FETCH_COMMENTS_REQUEST
  };
}