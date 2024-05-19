// src/components/Layout/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <div>
        <Link to="/properties" className="mr-4">Properties</Link>
        {user.userType === 'seller' && <Link to="/my-properties" className="mr-4">My Properties</Link>}
        {user.userType === 'seller' && <Link to="/add-property" className="mr-4">Add Property</Link>}
      </div>
      <button onClick={handleLogout} className="bg-red-500 rounded px-4 py-2">Logout</button>
    </nav>
  );
};

export default Navbar;
