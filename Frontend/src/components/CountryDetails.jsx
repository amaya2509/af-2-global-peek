import React from 'react';

const CountryDetails = ({ country }) => {
  if (!country) {
    return (
      <div className="animate-pulse text-center p-8 text-gray-500 dark:text-gray-400">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mx-auto" />
        <p>Loading country details...</p>
      </div>
    );
  }

  const {
    name,
    flags,
    capital,
    region,
    subregion,
    population,
    area,
    timezones,
    currencies,
    languages,
    borders,
    tld,
    maps,
    unMember,
    startOfWeek,
  } = country;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-lg max-w-6xl mx-auto mt-10 transition-all">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <img
          src={flags?.svg || flags?.png}
          alt={`${name.common} flag`}
          className="w-full md:w-1/2 h-auto rounded-xl shadow-lg border dark:border-gray-700"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-2">{name.common}</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-300 italic mb-4">
            {name.official}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><strong>Capital:</strong> {capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {region} / {subregion}</p>
            <p><strong>Population:</strong> {population.toLocaleString()}</p>
            <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
            <p><strong>Start of Week:</strong> {startOfWeek}</p>
            <p><strong>UN Member:</strong> {unMember ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Timezones:</strong> {timezones?.join(', ')}</p>
            <p><strong>Top Level Domain:</strong> {tld?.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-1">Languages</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {languages ? Object.values(languages).join(', ') : 'N/A'}
        </p>
      </div>

      {/* Currencies */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-1">Currencies</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {currencies
            ? Object.values(currencies).map((cur) => `${cur.name} (${cur.symbol})`).join(', ')
            : 'N/A'}
        </p>
      </div>

      {/* Borders */}
      {borders?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Bordering Countries</h3>
          <div className="flex flex-wrap gap-2">
            {borders.map((code) => (
              <span
                key={code}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium shadow"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Map */}
      {maps?.googleMaps && (
        <div className="mt-6">
          <a
            href={maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            🌍 View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
