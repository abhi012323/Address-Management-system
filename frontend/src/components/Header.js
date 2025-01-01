import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>Address Management</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/addresses">Addresses</a>
      </nav>
    </header>
  );
};

export default Header;