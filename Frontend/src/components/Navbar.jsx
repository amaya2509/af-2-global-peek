import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/20 px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-20">
      <Link to="/" className="text-2xl font-extrabold text-white drop-shadow-md tracking-wide">
        GLOBALPEEK
      </Link>
      <div className="space-x-6 text-white font-medium">
        <Link to="/" className="hover:text-green-300 transition duration-200">Home</Link>
        <Link to="/continents" className="hover:text-green-300 transition duration-200">Continents</Link>
        {user && (
          <Link to="/favorites" className="hover:text-green-300 transition duration-200">Favorites</Link>
        )}
        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-300 transition duration-200">Login</Link>
            <Link to="/register" className="hover:text-green-300 transition duration-200">Register</Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-red-400 hover:text-red-300 transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
