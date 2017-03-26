import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTopics} from '../actions/actions';
import {NavBar} from './NavBar';

class App extends Component {
  componentDidMount () {
    this.props.fetchTopics();
  }
  render() {
    return (
      <div>
        <h3 className='title is-3'>All Articles</h3>
        <NavBar topics={this.props.topics}/>
        {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopics: () => {
      dispatch(fetchTopics());
    }
  };
}

function mapStateToProps (state) {
  return {
    topics: state.topics.data
  };
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  fetchTopics: React.PropTypes.func.isRequired,
  topics: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
