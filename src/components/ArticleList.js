import React, {Component} from 'react';
import {connect} from 'react-redux';
import {voteArticle} from '../actions/actions';
import {articlesByVote} from '../lib/helpers';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import Animation from 'react-addons-css-transition-group';

class ArticleList extends Component {
  render () {
    if (!this.isReady()) return (<Loading />);

    return (
      <main className="section">
        <ul className="container">
          <Animation transitionName="main-anim"
            transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}
            transitionAppear={true} transitionEnter={true} transitionLeave={true}>
            {this.generateArticles()}
          </Animation>
        </ul>
      </main>
    );
  }
  generateArticles () {
    let {articles} = this.props;

    return Object.keys(articles).map((key, i) => {
      let article = articles[key];

      return (
        <ArticleCard
          key={i}
          _id={article._id}
          title={article.title}
          votes={article.votes}
          comment_count={article.comment_count}
          created_by={article.created_by}
          voteHandler={this.props.voteHandler}
        />
      );
    });
  }
  isReady () {
    return Object.keys(this.props.articles).length;
  }
}

ArticleList.propTypes = {
  articles: React.PropTypes.array.isRequired,
  voteHandler: React.PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    articles: articlesByVote(state)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    voteHandler: (article_id, vote) => {
      dispatch(voteArticle(article_id, vote));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
