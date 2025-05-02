import axios from "axios";
import { getToken } from "../utils/tokenUtils";

const authHeader = () => ({
    headers: {Authorization: `Bearer ${getToken()}`},
});

export const getFavorites = async () => {
    const res = await axios.get('/api/user/favorites', authHeader());
    return res.data;
};

export const addFavorite = async (cca3) => {
    const res = await axios.post('/api/user/favorites', {cca3}, authHeader());
    return res.data;
}

export const removeFavorite = async (cca3) => {
    const res = await axios.delete('/api/user/favorites', {data: {cca3}, ...authHeader()});
    return res.data;
};