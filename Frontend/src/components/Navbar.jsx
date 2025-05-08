import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/10 backdrop-blur-lg shadow-lg border-b border-white/20 px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-20">
      <Link
        to="/"
        className="text-2xl font-extrabold text-purple-100 drop-shadow-md tracking-wide"
      >
        GLOBALPEEK
      </Link>

      {/* Hamburger Icon */}
      <button
        className="text-white md:hidden text-2xl"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 text-white font-medium">
        <Link to="/" className="hover:text-purple-600 transition duration-200">
          Home
        </Link>
        <Link to="/continents" className="hover:text-purple-600 transition duration-200">
          Continents
        </Link>
        {user && (
          <Link to="/favorites" className="hover:text-purple-600 transition duration-200">
            Favorites
          </Link>
        )}
        {!user ? (
          <>
            <Link to="/login" className="hover:text-purple-600 transition duration-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-purple-600 transition duration-200">
              Register
            </Link>
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

      {/* Mobile Links */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-black/90 backdrop-blur-sm flex flex-col items-center py-6 space-y-4 text-white md:hidden z-30">
          <Link to="/" onClick={toggleMenu} className="hover:text-green-300">Home</Link>
          <Link to="/continents" onClick={toggleMenu} className="hover:text-purple-600">Continents</Link>
          {user && (
            <Link to="/favorites" onClick={toggleMenu} className="hover:text-purple-600">Favorites</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:text-purple-600">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="hover:text-purple-600">Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
