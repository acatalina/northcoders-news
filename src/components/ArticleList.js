import React, {Component} from 'react';
import {fetchArticles} from '../actions/actions';
import {getTopArticles} from '../reducer/articles.reducer';
import {connect} from 'react-redux';

import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
    return (
      <div id='ArticleList'>
        <ul className="articles-list">
          {this.generateArticles()}
        </ul>
      </div>
    );
  }
  generateArticles() {
    return this.props.articles.map(function(article, i) {
      return (
        <ArticleCard 
          key={i}
          title={article.title}
          votes={article.votes}
          comments={article.comments}
          articleId={article._id}
        />
      );
    });
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getArticles: () => {
      dispatch(fetchArticles());
    }
  };
}

function mapStateToProps (state) {
  return {
    articles: getTopArticles(state)
  };
}

ArticleList.propTypes = {
  getArticles: React.PropTypes.func.isRequired,
  articles: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);