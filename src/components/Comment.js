import React from 'react';
import VoteButtons from './VoteButtons';

const Comment = (props) => {
  return (
    <li key={props._id} className="box columns">
      <VoteButtons votes={props.votes} 
        voteHandler={this.props.voteComment.bind(null, props._id)}
      />
      <div className="column">
        <p>{props.body}</p>
        <span>by: {props.created_by}</span>
        <span>at {props.created_at}</span>
      </div>
      <div className="column is-narrow">
        <button onClick={deleteHandler.bind(null, props)}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    </li>
  );
};

Comment.propType = {
  comment_id: React.PropTypes.string.isRequired,
  votes: React.PropTypes.number.isRequired,
  _id: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  created_by: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.number.isRequired
};

const deleteHandler = (props) => {
  let [comment_id, user] = props;

  if (user !== 'northcoder') {
    return window.alert('unauthorised user');
  }

  props.deleteComment(comment_id);
};

export default Comment;