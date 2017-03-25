import * as actions from '../src/actions/actions';
import * as types from '../src/actions/types';
import {expect} from 'chai';

describe('actions', () => {
  describe('actions.fetchArticlesSuccess', () => {
    it('returns the expected action', () => {
      const action = actions.fetchArticlesSuccess({});
      expect(action).to.eql({
        type: types.FETCH_ARTICLES_SUCCESS,
        data: {}
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
});