import {expect} from 'chai';
import commentsReducer from '../src/reducer/comments.reducer';
import * as actions from '../src/actions/actions';

describe('comments reducer', () => {
  it('handles FETCH_COMMENTS_REQUESTS', () => {
    const action = actions.fetchCommentsRequest();
    const initialState = {
      fetching: false
    };

    const actual = commentsReducer(initialState, action);
    const expected = {
      fetching: true
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(initialState);
  });
  
  it('handles FETCH_COMMENTS_SUCCESS', () => {
    const action = actions.fetchCommentsSuccess([{_id: 1, body: 'comment'}]);
    const initialState = {
      fetching: true,
      data: {}
    };
    
    const actual = commentsReducer(initialState, action);
    const expected = {
      fetching: false,
      data: {1: {_id: 1, body: 'comment'}}
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(initialState);
  });

  it('handles FETCH_COMMENTS_ERROR', () => {
    const action = actions.fetchCommentsError('error');
    const initialState = {
      fetching: true,
      error: null
    };
    
    const actual = commentsReducer(initialState, action);
    const expected = {
      fetching: false,
      error: 'error'
    };
    expect(actual).to.eql(expected);
  });
});
