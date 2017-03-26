import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTopArticles} from '../reducer/articles.reducer';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
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
          articleId={article._id}
        />
      );
    });
  }
}

ArticleList.propTypes = {
  articles: React.PropTypes.array.isRequired
};

function mapStateToProps (state) {
  return {
    articles: getTopArticles(state)
  };
}

export default connect(mapStateToProps)(ArticleList);