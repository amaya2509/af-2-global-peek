import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllCountries,
  getCountryByName,
  getCountryByCode,
  getCountriesByRegion,
  fetchRelatedCountries,
} from '../../services/countriesApi';

// Mock global fetch
global.fetch = vi.fn();

const mockFetch = (data, ok = true) => {
  fetch.mockResolvedValueOnce({
    ok,
    json: () => Promise.resolve(data),
  });
};

beforeEach(() => {
  fetch.mockReset();
});

describe('countriesApi service functions', () => {
  it('getAllCountries returns list of countries', async () => {
    const mockData = [{ name: { common: 'France' } }];
    mockFetch(mockData);

    const result = await getAllCountries();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
  });

  it('getCountryByName returns correct country', async () => {
    const mockData = [{ name: { common: 'India' } }];
    mockFetch(mockData);

    const result = await getCountryByName('India');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/India');
  });

  it('getCountryByCode returns single country object', async () => {
    const mockData = [{ name: { common: 'Japan' } }];
    mockFetch(mockData);

    const result = await getCountryByCode('JPN');
    expect(result).toEqual(mockData[0]);
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/JPN');
  });

  it('getCountryByCode throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(getCountryByCode('XXX')).rejects.toThrow('Country not found');
  });

  it('getCountriesByRegion returns region countries', async () => {
    const mockData = [{ name: { common: 'Nigeria' } }];
    mockFetch(mockData);

    const result = await getCountriesByRegion('Africa');
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/Africa');
  });

  it('fetchRelatedCountries returns sliced data', async () => {
    const mockData = [
      { name: { common: 'USA' } },
      { name: { common: 'Canada' } },
      { name: { common: 'Mexico' } },
    ];
    mockFetch(mockData);

    const result = await fetchRelatedCountries('America');
    expect(result).toEqual(mockData.slice(1));
  });

  it('fetchRelatedCountries returns empty array on bad response', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const result = await fetchRelatedCountries('UnknownLand');
    expect(result).toEqual([]);
  });
});
