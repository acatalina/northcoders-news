import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, fetchUsers, voteComment,
  voteArticle, addComment, deleteComment
} from '../actions/actions';
import Loading from './Loading';
import Article from './Article';
import Comment from './Comment';
import PostCommentForm from './PostCommentForm';
import {sortByDate, resetInput} from '../lib/helpers';
import Animation from 'react-addons-css-transition-group';

class ArticlePage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      input: ''
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount () {
    this.props.fetchComments(this.props.params.article_id);
    this.props.fetchUsers();
  }
  render () {
    if (!this.isReady()) return (<Loading />);

    return (
      <main className="section">
        <Animation transitionName="main-anim"
          transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}
          transitionAppear={true} transitionEnter={true} transitionLeave={true}>
          <section className="container box">
            {this.generateArticle()}
            {this.generateForm()}
            <ul className="box no-top-borderadius">
              {this.generateComments()}
            </ul>
          </section>
        </Animation>
      </main>
    );
  }
  generateArticle () {
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
  generateComments () {
    let {comments} = this.props;
    let {users} = this.props;

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
          avatar_url={users[comment.created_by].avatar_url}
        />
      );
    });
  }
  generateForm () {
    return (
      <PostCommentForm
        inputHandler={this.inputHandler}
        submitHandler={this.submitHandler}
        input={this.state.input}
        avatar_url={this.props.users.northcoder.avatar_url}
      />
    );
  }
  inputHandler (event) {
    let {value} = event.target;

    this.setState({
      input: value
    });
  }
  submitHandler (event) {
    event.preventDefault();

    let {article_id} = this.props.params;
    let {input} = this.state;

    this.props.addComment(article_id, input);

    this.setState(resetInput);
  }
  isReady () {
    return Object.keys(this.props.comments).length &&
      Object.keys(this.props.articles).length &&
      Object.keys(this.props.users).length;
  }
}

ArticlePage.propTypes = {
  fetchComments: React.PropTypes.func.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  articles: React.PropTypes.object.isRequired,
  comments: React.PropTypes.array.isRequired,
  users: React.PropTypes.object.isRequired,
  voteComment: React.PropTypes.func.isRequired,
  voteArticle: React.PropTypes.func.isRequired,
  addComment: React.PropTypes.func.isRequired,
  deleteComment: React.PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
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
    },
    fetchUsers: () => {
      dispatch(fetchUsers());
    }
  };
}

function mapStateToProps (state) {
  return {
    articles: state.articles.data,
    comments: sortByDate(state.comments.data),
    users: state.users.data
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
