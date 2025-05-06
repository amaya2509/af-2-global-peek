import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CountryDetails from '../components/CountryDetails';

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const data = await res.json();
      setCountry(data[0]); // Make sure data[0] is used
      setLoading(false);
    };

    fetchCountry();
  }, [code]);

  return (
    <>
      {loading ? (
        <p className="text-center mt-10 text-gray-500">Loading...</p>
      ) : (
        <CountryDetails country={country} />
      )}
    </>
  );
};

export default CountryPage;
