import * as actions from '../src/actions/actions';
import * as types from '../src/actions/types';
import {expect} from 'chai';

describe('actions', () => {
  describe('actions.fetchArticlesSuccess', () => {
    it('returns the expected action', () => {
      const action = actions.fetchArticlesSuccess({}, 'topic');
      expect(action).to.eql({
        type: types.FETCH_ARTICLES_SUCCESS,
        data: {},
        topic: 'topic'
      });
    });
  });

  describe('actions.fetchArticlesError', () => {
    it('returns the expected action', () => {
      const action = actions.fetchArticlesError({});
      expect(action).to.eql({
        type: types.FETCH_ARTICLES_ERROR,
        error: {}
      });
    });
  });

  describe('actions.fetchArticlesRequest', () => {
    it('returns the expected action', () => {
      const action = actions.fetchArticlesRequest();
      expect(action).to.eql({
        type: types.FETCH_ARTICLES_REQUEST
      });
    });
  });

  describe('actions.fetchTopicsSuccess', () => {
    it('returns the expected action', () => {
      const action = actions.fetchTopicsSuccess({});
      expect(action).to.eql({
        type: types.FETCH_TOPICS_SUCCESS,
        data: {}
      });
    });
  });

  describe('actions.fetchTopicsError', () => {
    it('returns the expected action', () => {
      const action = actions.fetchTopicsError({});
      expect(action).to.eql({
        type: types.FETCH_TOPICS_ERROR,
        error: {}
      });
    });
  });

  describe('actions.fetchTopicsRequest', () => {
    it('returns the expected action', () => {
      const action = actions.fetchTopicsRequest();
      expect(action).to.eql({
        type: types.FETCH_TOPICS_REQUEST
      });
    });
  });

  describe('actions.fetchCommentsSuccess', () => {
    it('returns the expected action', () => {
      const action = actions.fetchCommentsSuccess({});
      expect(action).to.eql({
        type: types.FETCH_COMMENTS_SUCCESS,
        data: {}
      });
    });
  });

  describe('actions.fetchCommentsError', () => {
    it('returns the expected action', () => {
      const action = actions.fetchCommentsError({});
      expect(action).to.eql({
        type: types.FETCH_COMMENTS_ERROR,
        error: {}
      });
    });
  });

  describe('actions.fetchCommentsRequest', () => {
    it('returns the expected action', () => {
      const action = actions.fetchCommentsRequest();
      expect(action).to.eql({
        type: types.FETCH_COMMENTS_REQUEST
      });
    });
  });
});