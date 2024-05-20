import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <div>
        
        {user.userType === 'buyer' && <Link to="/properties" className="mr-4">Properties</Link>}
        {user.userType === 'seller' && <Link to="/my-properties" className="mr-4">My Properties</Link>}
        {user.userType === 'seller' && <Link to="/add-property" className="mr-4">Add Property</Link>}
      </div>
      {user && user.userType && (
            <span className="mr-4">{`${user.userType.charAt(0).toUpperCase() + user.userType.slice(1)} - ${user.firstName} ${user.lastName}`}</span>
          )}
      <button onClick={handleLogout} className="bg-red-500 rounded px-4 py-2">Logout</button>
    </nav>
  );
};

export default Navbar;
