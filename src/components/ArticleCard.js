import React from 'react';
import NavLink from './NavLink';
import VoteButtons from './VoteButtons';

const ArticleCard = (props) => {
  return (
    <div className="box">
      <article className="columns">
        <VoteButtons votes={props.votes} 
          voteHandler={props.voteHandler.bind(null, props._id)} 
        />
        <NavLink to={`/articles/${props._id}`}>
        <div className="column">
          <div className="content">
            <h3 className="title is-3">{props.title}</h3>
          </div>
        </div>
        </NavLink>
      </article>
    </div>
  );
};

ArticleCard.propTypes = {
  votes: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
  voteHandler: React.PropTypes.func.isRequired
};

export default ArticleCard;
