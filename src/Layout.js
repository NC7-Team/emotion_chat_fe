import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const linkStyle = {
  fontSize: '14px',
  textDecoration: 'none',
  color: 'black',
};
const headerStyle = {
  background: 'linear-gradient(to bottom, #B5E8EE, rgba(255, 255, 255, 0.8))',
  padding: '16px',
  fontSize: '17px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const Layout = () => {
  return (
    <div>


      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
