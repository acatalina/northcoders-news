import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchArticles, voteComment, voteArticle} from '../actions/actions';
import Loading from './Loading';
import VoteButtons from './VoteButtons';
import ArticlePageInfo from './ArticlePageInfo';

class ArticlePage extends Component {
  componentDidMount () {
    this.props.fetchComments(this.props.params.article);
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps);
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
      <ArticlePageInfo 
        key={articleId}
        articleId={articleId}
        votes={article.votes}
        voteHandler={this.props.voteArticle}
        title={article.title}
        body={article.body}
        created_by={article.created_by}
      />
    );
  }
  generateComments() {
    let comments = this.props.comments;

    return Object.keys(comments).map((key, i) => {
      return (
        <li key={i} className="box columns">
          <VoteButtons votes={comments[key].votes} 
            voteHandler={this.props.voteComment.bind(null, comments[key]._id)}
          />
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
    },
    voteArticle: (article_id, vote) => {
      dispatch(voteArticle(article_id, vote));
    },
    voteComment: (comment_id, vote) => {
      dispatch(voteComment(comment_id, vote));
    }
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles.data,
    comments: state.comments.data
  };
}

ArticlePage.propTypes = {
  fetchComments: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  articles: React.PropTypes.object.isRequired,
  comments: React.PropTypes.object.isRequired,
  voteComment: React.PropTypes.func.isRequired,
  voteArticle: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);