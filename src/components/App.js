import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTopics, fetchArticles} from '../actions/actions';
import {NavBar} from './NavBar';
import {getTopic} from '../lib/helpers';

class App extends Component {
  componentDidMount () {
    this.props.fetchTopics();
    this.props.fetchArticles(this.getTopic(this.props));
  }
  componentWillReceiveProps(newProps) {
    if (newProps.fetchingArticles || this.props.fetchingArticles) return;

    const newTopic = getTopic(newProps);
    const oldTopic = getTopic(this.props);

    if (newTopic !== oldTopic) {
      this.props.fetchArticles(newTopic);
    }
  }
  render() {
    return (
      <div>
        <h1 className="title is-3">northcoders news</h1>
        <NavBar topics={this.props.topics}/>
        {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: (topic) => {
      dispatch(fetchArticles(topic));
    },
    fetchTopics: () => {
      dispatch(fetchTopics());
    }
  };
}

function mapStateToProps (state) {
  return {
    topics: state.topics.data,
    topic: state.articles.topic,
    fetchingArticles: state.articles.fetching,
    articles: state.articles.data
  };
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  fetchArticles: React.PropTypes.func.isRequired,
  fetchTopics: React.PropTypes.func.isRequired,
  topics: React.PropTypes.array.isRequired,
  topic: React.PropTypes.string,
  params: React.PropTypes.object,
  fetchingArticles: React.PropTypes.bool.isRequired,
  articles: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
