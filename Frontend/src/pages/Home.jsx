// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CountryCard from '../components/CountryCard';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/countriesApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, region]);

  const fetchCountries = async () => {
    try {
      if (searchTerm) {
        const res = await getCountryByName(searchTerm);
        setCountries(res);
      } else if (region) {
        const res = await getCountriesByRegion(region);
        setCountries(res);
      } else {
        const res = await getAllCountries();
        setCountries(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Hero onSearch={setSearchTerm} onFilter={setRegion} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Home;
