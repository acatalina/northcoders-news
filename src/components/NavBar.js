import React from 'react';
import NavLink from './NavLink';

export const NavBar = (props) => {
  console.log(props);
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
      <li className="nav-item" 
        key={i}
        value={topic.title}>
          <NavLink to={`/topics/${topic.title}`}>
            {topic.title}
          </NavLink>
      </li>
    );
  });
}