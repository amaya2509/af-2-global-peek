import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error("Country not found");
        const data = await res.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full md:w-1/2 rounded shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
          <div className="space-y-2">
            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
            <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
