import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTopics, fetchArticles} from '../actions/actions';
import {NavBar} from './NavBar';

class App extends Component {
  componentDidMount () {
    this.props.fetchTopics();
    this.props.fetchArticles(this.getTopic(this.props.params));
  }
  componentWillReceiveProps(newProps) {
    if (newProps.fetchingArticles || this.props.fetchingArticles) return;

    const newTopic = this.getTopic(newProps.params);
    const oldTopic = this.getTopic(this.props);

    if (newTopic !== oldTopic) {
      this.props.fetchArticles(newTopic);
    }
  }
  render() {
    return (
      <div>
        <h3 className='title is-3'>northcoders news</h3>
        <NavBar topics={this.props.topics}/>
        {this.props.children}
      </div>
    );
  }
  getTopic(obj) {
    switch (true) {
      case obj.hasOwnProperty('topic'):
        return obj['topic'];
      case obj.hasOwnProperty('article'): {
        let artRequest = obj['article'];
        let article = this.props.articles[artRequest];
        let topic;

        if (!article) {
          topic = 'all';
        } else {
          topic = article['belongs_to'];
        }

        return topic;
      }
      default:
        return 'all';
    }
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
