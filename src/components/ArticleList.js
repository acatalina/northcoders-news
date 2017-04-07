import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTopArticles} from '../reducer/articles.reducer';
import {voteArticle} from '../actions/actions';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  render() {
    return (
      <section className="section">
        <ul className="container">
          {this.generateArticles()}
        </ul>
      </section>
    );
  }
  generateArticles() {
    return this.props.articles.map((article, i) => {
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