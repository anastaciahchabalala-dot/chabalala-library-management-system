import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ currentUser, logout }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div><h1>Chabalala Community Library</h1><p>Management System</p></div>
      </div>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        {currentUser.role === 'Admin' && <NavLink to="/users">Users</NavLink>}
        <span className="user-label">{currentUser.name} ({currentUser.role})</span>
        <button className="light-button" onClick={logout}>Logout</button>
      </nav>
    </header>
  );
}
export default Navbar;
