import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/myPage">My Page</Link>
    </nav>
  );
}

export default Navigation;