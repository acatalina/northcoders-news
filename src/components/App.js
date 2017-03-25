import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h3 className='title is-3'>All Articles</h3>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
