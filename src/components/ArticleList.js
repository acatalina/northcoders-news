import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTopArticles} from '../reducer/articles.reducer';
import {voteArticle} from '../actions/actions';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  render() {
    return (
      <div id='ArticleList'>
        <ul className="container">
          {this.generateArticles()}
        </ul>
      </div>
    );
  }
  generateArticles() {
    return this.props.articles.map((article, i) => {
      return (
        <ArticleCard 
          key={i}
          title={article.title}
          votes={article.votes}
          articleId={article._id}
          voteHandler={this.props.voteHandler}
        />
      );
    });
  }
}

ArticleList.propTypes = {
  articles: React.PropTypes.array.isRequired,
  voteHandler: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    articles: getTopArticles(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voteHandler: (article_id, vote) => {
      dispatch(voteArticle(article_id, vote));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);