import axios from 'axios';
import { getToken } from '../utils/tokenUtils';

const API_URL = 'http://localhost:5000/api/users/favorites';

export const addFavorite = async (countryCode) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, { countryCode }, config);
  return res.data;
};

export const removeFavorite = async (countryCode) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL, {
    data: { countryCode },
    ...config,
  });
  return res.data;
};

export const getFavorites = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);
  return res.data;
};
