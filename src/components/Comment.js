import React from 'react';
import VoteButtons from './VoteButtons';
import {getTime} from '../lib/helpers';

const Comment = (props) => {
  return (
    <li key={props._id} className="box columns">
      <VoteButtons votes={props.votes} 
        voteHandler={props.voteComment.bind(null, props._id)}
      />
      <div className="column">
        <p>{props.body}</p>
        <span>by: {props.created_by}</span>
        <span> - {getTime(props.created_at)}</span>
      </div>
      <div className="column is-narrow">
        <button className="button is-small" 
          onClick={deleteHandler.bind(null, props)}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    </li>
  );
};

Comment.propType = {
  _id: React.PropTypes.string.isRequired,
  votes: React.PropTypes.number.isRequired,
  body: React.PropTypes.string.isRequired,
  created_by: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.number.isRequired,
  deleteComment: React.PropTypes.func.isRequired,
  voteComment: React.PropTypes.func.isRequired
};

const deleteHandler = (props) => {
  let {_id, created_by} = props;

  if (created_by !== 'northcoder') {
    return window.alert('unauthorised user');
  }

  props.deleteComment(_id);
};

export default Comment;