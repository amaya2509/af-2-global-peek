import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CountryCard from '../components/CountryCard';

const ContinentCountries = () => {
  const { continentName } = useParams();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/region/${continentName}`);
      const data = await res.json();
      setCountries(data);
    };
    fetchCountries();
  }, [continentName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Countries in {continentName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default ContinentCountries;
