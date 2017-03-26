import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchArticles} from '../actions/actions';

class ArticlePage extends Component {
  componentDidMount () {
    this.props.fetchComments(this.props.params.article);
  }
  render() {
    return (
      <section>
        {/*{this.generateArticle()}*/}
      </section>
    );
  }
  generateArticle() {
    let article = this.props.params.article;
    let articles = this.props.articles;

    return articles[article].map((article) => {
      return (
        <div>{article.body}
        </div>
      );
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: (topic) => {
      dispatch(fetchArticles(topic));
    },
    fetchComments: () => {
      dispatch(fetchComments());
    }
  };
}

function mapStateToProps (state) {
  return {
    articles: state.articles.data,
    comments: state.comments.data
  };
}

ArticlePage.propTypes = {
  fetchComments: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  articles: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);