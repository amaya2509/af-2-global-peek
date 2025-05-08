import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import { getCountryByCode, getCountryByName, fetchRelatedCountries } from '../services/countriesApi';

const CountryDetails = ({country}) => {
  
  const [relatedCountries, setRelatedCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelated = async () => {
      if (country?.name?.common) {
        try {
          const relatedCountries = await fetchRelatedCountries(country.name.common);
          setRelatedCountries(relatedCountries);
        } catch (err) {
          console.error("Failed to fetch related countries", err);
        }
      }
    };
  
    fetchRelated();
  }, [country]);
  

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-900 to-blue-700">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400"></div>
  //     </div>
  //   );
  // }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>{error}</p>
        <Link to="/" className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-full">
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      {/* <nav className="bg-blue-800/50 backdrop-blur-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">World Explorer</Link>
          <Link to="/" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-1 rounded-full text-sm">
            Back to Countries
          </Link>
        </div>
      </nav> */}

      {/* Flag Banner */}
      <div className="mx-auto max-w-md flex flex-col items-center gap-4 py-6">
  <div className="h-32 md:h-40 flex items-center justify-center overflow-hidden rounded-lg shadow-md bg-white/10">
    <img
      src={country.flags?.png || country.flags?.svg}
      alt={`Flag of ${country.name?.common}`}
      className="max-h-full object-contain"
    />
  </div>
  <div className="text-center">
    <h1 className="text-3xl font-bold">{country.name?.common}</h1>
    <p className="text-white/70">{country.name?.official}</p>
  </div>
</div>



      {/* Country Info */}
      <div className="container mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-xl font-bold border-b border-white/30 pb-2 mb-4">Basic Info</h2>
            <ul className="space-y-2">
              <li>🏙️ <strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</li>
              <li>🌍 <strong>Region:</strong> {country.region} {country.subregion ? `(${country.subregion})` : ''}</li>
              <li>👨‍👩‍👧‍👦 <strong>Population:</strong> {country.population?.toLocaleString()}</li>
              <li>📏 <strong>Area:</strong> {country.area?.toLocaleString()} km²</li>
            </ul>
          </div>

          {/* Languages & Currency */}
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-xl font-bold border-b border-white/30 pb-2 mb-4">Languages & Currency</h2>
            <p><strong>Languages:</strong></p>
            <div className="flex flex-wrap gap-2">
              {country.languages ? Object.values(country.languages).map((lang, i) => (
                <span key={i} className="bg-blue-600/50 px-3 py-1 rounded-full text-sm">{lang}</span>
              )) : "N/A"}
            </div>
            <p className="mt-4"><strong>Currencies:</strong></p>
            <div className="flex flex-wrap gap-2">
              {country.currencies ? Object.entries(country.currencies).map(([code, { name, symbol }]) => (
                <span key={code} className="bg-green-600/50 px-3 py-1 rounded-full text-sm">
                  {name} ({symbol || code})
                </span>
              )) : "N/A"}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Fun Facts */}
          <div className="bg-yellow-100 text-blue-900 p-6 rounded-xl border-2 border-yellow-300">
            <h2 className="text-xl font-bold mb-4">✨ Fun Facts</h2>
            <ul className="space-y-2">
              <li>📌 {country.name?.common} is located in {country.region}{country.subregion && ` (${country.subregion})`}.</li>
              {country.independent !== undefined && (
                <li>{country.independent ? '🎉 Independent country' : '🤝 Not independent'}</li>
              )}
              {country.unMember && <li>🇺🇳 UN Member</li>}
              {country.borders?.length === 0 && <li>🏝️ Island nation (no land borders)</li>}
            </ul>
          </div>

          {/* Borders */}
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-3">Neighboring Countries</h2>
            {country.borders?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <Link key={border} to={`/country/${border}`} className="bg-white/30 px-3 py-1 rounded-lg hover:bg-white/40 text-sm">
                    {border}
                  </Link>
                ))}
              </div>
            ) : <p>No land borders</p>}
          </div>

          {/* Greetings */}
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-3">Say Hello!</h2>
            {country.languages ? (
              Object.entries(country.languages).map(([code, language]) => {
                const greetings = {
                  eng: "Hello!", spa: "¡Hola!", fra: "Bonjour!", deu: "Hallo!", ita: "Ciao!",
                  por: "Olá!", rus: "Привет!", jpn: "こんにちは!", kor: "안녕하세요!",
                  zho: "你好!", ara: "مرحبا!", hin: "नमस्ते!", sqi: "Përshëndetje!"
                };
                return (
                  <p key={code}><strong>{language}:</strong> {greetings[code] || 'Hello!'}</p>
                );
              })
            ) : <p>No greeting available</p>}
          </div>
        </div>
      </div>

      {/* Related Countries */}
      {relatedCountries.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Explore More Countries</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedCountries.map((c) => (
              <Link key={c.cca3} to={`/country/${c.cca3}`} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl text-center">
                <img src={c.flags?.png} alt={c.name.common} className="w-full h-24 object-cover rounded-md mb-2" />
                <h3 className="text-white font-bold">{c.name.common}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
