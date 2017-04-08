import React from 'react';
import NavLink from './NavLink';

export const NavBar = (props) => {
  return (
    <nav className="nav has-shadow">
      <ul className="nav-center">
        <li className="nav-item is-success">
          <NavLink to={'/'}>
            all
          </NavLink>
        </li>
        {generateTopics(props.topics)}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  topics: React.PropTypes.array.isRequired 
};
  
function generateTopics(topics) {
  return topics.map((topic, i) => {
    return (
      <li className="nav-item" 
        key={i}
        value={topic.title}>
          <NavLink to={`/topics/${topic.title.toLowerCase()}`}>
            {topic.title}
          </NavLink>
      </li>
    );
  });
}

export default NavBar;