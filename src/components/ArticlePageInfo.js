import React from 'react';
import VoteButtons from './VoteButtons';

const ArticlePageInfo = function(props) {
  return (
    <article key={props.articleId} className="columns">
      <VoteButtons votes={props.votes} 
        voteHandler={props.voteHandler.bind(null, props.articleId)}
      />
      <div className="column">
        <h2 className="title is-3">{props.title}</h2>
        <p>{props.body}</p>
        <p>created by: {props.created_by}</p>
      </div>
    </article>
  );
};

ArticlePageInfo.propTypes = {
  articleId: React.PropTypes.string.isRequired,
  votes: React.PropTypes.number.isRequired,
  voteHandler: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  created_by: React.PropTypes.string.isRequired
};

export default ArticlePageInfo;