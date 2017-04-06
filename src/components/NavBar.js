import React from 'react';
import NavLink from './NavLink';

export const NavBar = (props) => {
  return (
    <nav className="nav has-shadow">
      <ul className="nav-center">
        {generateTopics(props.topics)}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  topics: React.PropTypes.array.isRequired 
};
  
function generateTopics(topics) {
  return [{title: 'all'}].concat(topics).map((topic, i) => {
    topic.title = topic.title.toUpperCase();
    return (
      <li key={i}
        className="nav-item"
        value={topic.title}>
          <NavLink to={`/topics/${topic.title}`}>
            {topic.title}
          </NavLink>
      </li>
    );
  });
}