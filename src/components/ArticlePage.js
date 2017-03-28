import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchArticles} from '../actions/actions';
import Loading from './Loading';
import VoteButtons from './VoteButtons';

class ArticlePage extends Component {
  componentDidMount () {
    this.props.fetchComments(this.props.params.article);
  }
  render() {
    if (!Object.keys(this.props.articles).length) return <Loading />;

    return (
      <section className="container box">
        {this.generateArticle()}
        <ul className="box">Comments:
          <form className="box">
            <input placeholder="new comment" />
            <button>send</button>
          </form>
          {this.generateComments()}
        </ul>
      </section>
    );
  }
  generateArticle() {
    let articleId = this.props.params.article;
    let allArticles = this.props.articles;
    let article = allArticles[articleId];

    return (
      <article key={articleId} className="columns">
        <VoteButtons votes={article.votes} />
        <div className="column">
          <h2 className="title is-3">{article.title}</h2>
          <p>{article.body}</p>
          <p>created by: {article.created_by}</p>
        </div>
      </article>
    );
  }
  generateComments() {
    let comments = this.props.comments;

    return Object.keys(comments).map((key, i) => {
      return (
        <li key={i} className="box columns">
          <VoteButtons votes={comments[key].votes} />
          <div className="column">
            <p>{comments[key].body}</p>
            <span>by: {comments[key].created_by}</span>
            <span>at {comments[key].created_at}</span>
          </div>
        </li>
      );
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: (topic) => {
      dispatch(fetchArticles(topic));
    },
    fetchComments: (article_id) => {
      dispatch(fetchComments(article_id));
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
  articles: React.PropTypes.object.isRequired,
  comments: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);