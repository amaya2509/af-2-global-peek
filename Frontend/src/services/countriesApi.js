
const API_BASE = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
    const res = await fetch(`${API_BASE}/all`);
    return res.json();
}

export const getCountryByName = async (name) => {
    const res = await fetch(`${API_BASE}/name/${name}`);
    return res.json();
}

export const getCountryByCode = async (code) => {
    const res = await fetch(`${API_BASE}/alpha/${code}`);
    if (!res.ok) throw new Error('Country not found');
    const data = await res.json();
    return data[0];
  };

export const getCountriesByRegion = async (region) => {
    const res = await fetch(`${API_BASE}/region/${region}`);
    return res.json();
}

export const fetchRelatedCountries = async (name) => {
    const res = await fetch(`${API_BASE}/name/${name}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(1);
  };