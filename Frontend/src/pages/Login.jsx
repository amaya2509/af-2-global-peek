import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-lg px-8 pt-6 pb-8 w-full max-w-sm text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wider">Login</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 bg-white/10 text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 bg-white/10 text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-800 hover:bg-purple-500 text-white font-semibold py-2 rounded transition"
        >
          Login
        </button>
        {/* Hyperlink for registration */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Haven't joined GlobalPeek yet?{' '}
          <Link to="/register" className="text-purple-400 hover:underline">
            Let's sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
