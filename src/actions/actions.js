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

export function voteArticle(article_id, vote) {
  return (dispatch) => {
    dispatch(voteArticleRequest());
    axios
      .put(`${ROOT}/articles/${article_id}?vote=${vote}`)
      .then(res => {
        dispatch(voteArticleSuccess(res.data));
      })
      .catch(error => {
         dispatch(voteArticleError(error));
      });
  };
}

export function voteArticleSuccess(article) {
  return {
    type: types.VOTE_ARTICLE_SUCCESS,
    data: article
  };
}

export function voteArticleError(error) {
  return {
    type: types.VOTE_ARTICLE_ERROR,
    error: error
  };
}

export function voteArticleRequest() {
  return {
    type: types.VOTE_ARTICLE_REQUEST
  };
}

export function voteComment(comment_id, vote) {
  return (dispatch) => {
    dispatch(voteCommentRequest());
    axios
      .put(`${ROOT}/comments/${comment_id}?vote=${vote}`)
      .then(res => {
        dispatch(voteCommentSuccess(comment_id, vote));
      })
      .catch(error => {
         dispatch(voteCommentError(error));
      });
  };
}

export function voteCommentSuccess(comment_id, vote) {
  return {
    type: types.VOTE_COMMENT_SUCCESS,
    comment_id: comment_id,
    vote: vote
  };
}

export function voteCommentError(error) {
  return {
    type: types.VOTE_COMMENT_ERROR,
    error: error
  };
}

export function voteCommentRequest() {
  return {
    type: types.VOTE_COMMENT_REQUEST
  };
}

export function addComment(article_id, comment) {
  return (dispatch) => {
    dispatch(addCommentRequest());
    axios
      .post(`${ROOT}/comments/${article_id}/comments`, {comment: comment})
      .then(res => {
        dispatch(addCommentSuccess(res.comment));
      })
      .catch(error => {
         dispatch(addCommentError(error));
      });
  };
}

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment: comment
  };
}

export function addCommentError(error) {
  return {
    type: types.ADD_COMMENT_ERROR,
    error: error
  };
}

export function addCommentRequest() {
  return {
    type: types.ADD_COMMENT_REQUEST
  };
}