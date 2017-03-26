import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTopics, fetchArticles} from '../actions/actions';
import {NavBar} from './NavBar';

class App extends Component {
  componentDidMount () {
    this.props.fetchTopics();
    this.props.fetchArticles(this.props.params.topic);
  }
  componentWillReceiveProps(newProps) {
    const newTopic = newProps.params.topic;
    const oldTopic = this.props.topic;
    
    if (newTopic !== oldTopic) {
      this.props.fetchArticles(newProps.params.topic);
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
    topic: state.articles.topic
  };
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  fetchArticles: React.PropTypes.func.isRequired,
  fetchTopics: React.PropTypes.func.isRequired,
  topics: React.PropTypes.array.isRequired,
  topic: React.PropTypes.string,
  params: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
