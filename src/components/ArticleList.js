import React, {Component} from 'react';
import {fetchArticles} from '../actions/actions';
import {getTopArticles} from '../reducer/articles.reducer';
import {connect} from 'react-redux';

class ArticleList extends Component {
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
    return (
      <div id='ArticleList'>
       {this.props.articles.map(function(article, i) {
          return (
            <p>{article.body}</p>  
          );
       })}
      </div>
    );
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