import React from 'react';

const VoteButtons = (props) => {
  return (
    <span className="column is-narrow rows">
      <a className="is-success is-small" 
        onClick={props.voteHandler.bind(null, 'up')}>
        <i className="fa fa-arrow-up row"></i>
      </a>
      <span className="row tag is-medium bold">{props.votes}</span>
      <a className="is-success is-small" 
        onClick={props.voteHandler.bind(null, 'down')}>
        <i className="fa fa-arrow-down row"></i>
      </a>
    </span>
  );
};

VoteButtons.propTypes = {
  votes: React.PropTypes.number.isRequired,
  voteHandler: React.PropTypes.func.isRequired
};

export default VoteButtons;