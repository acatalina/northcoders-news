import React from 'react';
import {Link} from 'react-router';

const NavLink = (props) => {
  return (
    <Link {...props} className="uppercase is-tab has-shadow" activeClassName="is-active"/>
  );
};

export default NavLink;