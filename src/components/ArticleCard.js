import React from 'react';
import NavLink from './NavLink';
import VoteButtons from './VoteButtons';

const ArticleCard = (props) => {
  return (
    <li className="box">
      <article className="columns">
        <VoteButtons votes={props.votes} 
          voteHandler={props.voteHandler.bind(null, props._id)}/>
        <div className="column has-text-centered fullwidth">
          <NavLink to={`/articles/${props._id}`}>
            <div className="content">
              <h3 className="title is-3">{props.title}</h3>
            <div>by: {props.created_by}</div>
            <span>Comments: {props.comment_count}</span>
            </div>
          </NavLink>
        </div>
      </article>
    </li>
  );
};

ArticleCard.propTypes = {
  _id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  created_by: React.PropTypes.string.isRequired,
  comment_count: React.PropTypes.number.isRequired,
  votes: React.PropTypes.number.isRequired,
  voteHandler: React.PropTypes.func.isRequired
};

export default ArticleCard;
