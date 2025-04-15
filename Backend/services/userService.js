// services/userService.js
import User from '../models/User.js';

export const addFavoriteCountry = async (userId, countryCode) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.favorites.includes(countryCode)) {
    user.favorites.push(countryCode);
    await user.save();
  }

  return user.favorites;
};

export const removeFavoriteCountry = async (userId, countryCode) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.favorites = user.favorites.filter(code => code !== countryCode);
  await user.save();

  return user.favorites;
};

export const getFavoriteCountries = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  return user.favorites;
};
