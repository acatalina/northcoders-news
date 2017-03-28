import React from 'react';

const VoteButtons = function(props) {
  return (
    <span className="column is-narrow rows">
      <i className="fa fa-arrow-up row"></i>
      <span className="row">{props.votes}</span>
      <i className="fa fa-arrow-down row"></i>
    </span>
  );
};

VoteButtons.propTypes = {
  votes: React.PropTypes.string.isRequired
};

export default VoteButtons;