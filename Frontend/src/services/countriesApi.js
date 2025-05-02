
const API_BASE = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
    const res = await fetch(`${API_BASE}/all`);
    return res.json();
}

export const getCountryByName = async (name) => {
    const res = await fetch(`${API_BASE}/name/${name}`);
    return res.json();
}

export const getCountriesByRegion = async (region) => {
    const res = await fetch(`${API_BASE}/region/${region}`);
    return res.json();
}