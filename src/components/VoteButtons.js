import React from 'react';

const VoteButtons = function(props) {
  return (
    <span className="column is-narrow rows">
      <button onClick={props.voteHandler.bind(null, 'up')}><i className="fa fa-arrow-up row"></i></button>
      <span className="row">{props.votes}</span>
      <button onClick={props.voteHandler.bind(null, 'down')}><i className="fa fa-arrow-down row"></i></button>
    </span>
  );
};

VoteButtons.propTypes = {
  votes: React.PropTypes.number.isRequired,
  voteHandler: React.PropTypes.func.isRequired
};

export default VoteButtons;