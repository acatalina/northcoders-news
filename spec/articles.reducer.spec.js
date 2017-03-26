import {expect} from 'chai';
import articlesReducer, {getTopArticles} from '../src/reducer/articles.reducer';
import * as actions from '../src/actions/actions';

describe('articles reducer', () => {
  it('handles FETCH_ARTICLES_REQUESTS', () => {
    const action = actions.fetchArticlesRequest();
    const initialState = {
      fetching: false
    };

    const actual = articlesReducer(initialState, action);
    const expected = {
      fetching: true
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(initialState);
  });
  
  it('handles FETCH_ARTICLES_SUCCESS', () => {
    const action = actions.fetchArticlesSuccess([{_id: 1, data: 'articles'}], 'topic');
    const initialState = {
      fetching: true,
      data: {},
      topic: null
    };
    
    const actual = articlesReducer(initialState, action);
    const expected = {
      fetching: false,
      data: {1: {_id: 1, data: 'articles'}},
      topic: 'topic'
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(initialState);
  });

  it('handles FETCH_ARTICLES_ERROR', () => {
    const action = actions.fetchArticlesError('error');
    const initialState = {
      fetching: true,
      error: null
    };
    
    const actual = articlesReducer(initialState, action);
    const expected = {
      fetching: false,
      error: 'error'
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(initialState);
  });
});

describe('getTopArticles', () => {
  it('turns an object into an array sorted by descending order on number of votes', () => {
    const data = {articles: { data: {'1': {votes: 1}, '2': {votes: 2}}}};
    const actual = getTopArticles(data);
    const expected = [{votes: 2}, {votes: 1}];
    expect(actual).to.eql(expected);
  });

  it('accepts a second value num to limit the amount of elements in the array', function() {
    const data = {articles: { data: {'1': {votes: 1}, '2': {votes: 2}}}};
    const actual = getTopArticles(data, 1);
    const expected = [{votes: 2}];
    expect(actual).to.eql(expected);
  });
});