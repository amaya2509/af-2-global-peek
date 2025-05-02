// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">GlobalPeek</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user && <Link to="/favorites" className="hover:underline">Favorites</Link>}
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
