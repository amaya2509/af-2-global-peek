// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CountryCard from "../components/CountryCard";
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName,
} from "../services/countriesApi";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [error, setError] = useState(null); // Ensure error state is defined

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, region]);

  const fetchCountries = async () => {
    try {
      let res = [];
      if (searchTerm) {
        res = await getCountryByName(searchTerm);
      } else if (region) {
        res = await getCountriesByRegion(region);
      } else {
        res = await getAllCountries();
      }
      console.log("API Response:", res); 
      setCountries(res);
      setVisibleCount(20); // reset pagination on new search/filter
      setError(null);
    } catch (err) {
      console.error("Error in fetching countries:", err); 
      setError("Error loading countries");
      setCountries([]);
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div>
      <Hero onSearch={setSearchTerm} onFilter={setRegion} />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mt-4" data-testid="error-message">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
        <AnimatePresence>
          {countries.slice(0, visibleCount).map((country) => (
            <motion.div
              key={country.cca3}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CountryCard country={country} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < countries.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
