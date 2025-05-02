import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${API_BASE}/login`, { email, password });
    return data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${API_BASE}/register`, { name, email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
