import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // <-- Make sure Firebase is initialized
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Name" className="w-full mb-4 px-3 py-2 border rounded" required />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mb-4 px-3 py-2 border rounded" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full mb-4 px-3 py-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
