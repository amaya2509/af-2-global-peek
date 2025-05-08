import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CountryDetails from "../components/CountryDetails";
import { getCountryByCode } from "../services/countriesApi";
import Loader from "../components/Loader";

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(code);
        setCountry(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  return (
    <main className="min-h-screen backdrop-blur-md text-white">
      {loading ? (
        <Loader />
      ) : (
        country && <CountryDetails country={country} />
      )}
    </main>
  );
};

export default CountryPage;
