import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchArticles, voteComment, 
  voteArticle, addComment, deleteComment
} from '../actions/actions';
import Loading from './Loading';
import Article from './Article';
import Comment from './Comment';

class ArticlePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount () {
    this.props.fetchComments(this.props.params.article_id);
  }
  render() {
    if (!Object.keys(this.props.articles).length) return <Loading />;
    
    return (
      <section className="section">
        <div className="container box">
          {this.generateArticle()}
          <form className="box has-text-centered is-marginless form" 
            onSubmit={this.submitHandler}>
            <textarea className="fullwidth em1and5" placeholder="new comment" 
              value={this.state.input}
              onChange={this.inputHandler}/>
            <input className="button is-success uppercase" 
              type="submit" value="post"/>
          </form>
          <ul className="box removeBorderRadiusTop">
            {this.generateComments()}
          </ul>
        </div>
      </section>
    );
  }
  generateArticle() {
    let {article_id} = this.props.params;
    let article = this.props.articles[article_id];

    return (
      <Article
        key={article_id}
        _id={article_id}
        votes={article.votes}
        voteHandler={this.props.voteArticle}
        title={article.title}
        body={article.body}
        created_by={article.created_by}
      />
    );
  }
  generateComments() {
    let {comments} = this.props;
    
    return Object.keys(comments).map((key, i) => {
      let comment = comments[key];
      
      return (
        <Comment 
          key={i}
          _id={comment._id}
          votes={comment.votes}
          voteComment={this.props.voteComment}
          body={comment.body}
          created_by={comment.created_by}
          created_at={comment.created_at}
          deleteComment={this.props.deleteComment}
        />
      );
    });
  }
  inputHandler(event) {
    let {value} = event.target;

    this.setState({
      input: value
    });
  }
  submitHandler(event) {
    event.preventDefault();

    let {article_id} = this.props.params;
    let {input} = this.state;

    this.props.addComment(article_id, input);
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
    },
    addComment: (article_id, comment) => {
      dispatch(addComment(article_id, comment));
    },
    deleteComment: (comment_id) => {
      dispatch(deleteComment(comment_id));
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
  voteArticle: React.PropTypes.func.isRequired,
  addComment: React.PropTypes.func.isRequired,
  deleteComment: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);