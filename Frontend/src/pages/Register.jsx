import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.name });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-lg px-8 pt-6 pb-8 w-full max-w-sm text-white"
      >
        <h3 className="text-xl font-bold mb-5 text-center tracking-tight">Join GLOBAL PEEK and explore the world</h3>
        <p className=' text-2xl mb-4 text-center'>🌍✈️💫</p>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 px-3 py-2 bg-white/10 text-white border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
