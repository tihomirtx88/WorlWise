import { createContext, useContext, useEffect, useState } from "react";

const CitiesCotnext = createContext();

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCharCode(...codePoints);
}

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:9000";

  useEffect(() => {
    async function fetchCities() {
      setLoading(true);
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was error loading data...");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
      console.log(data);
    } catch {
      alert("There was error loading data...");
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was error creating city...");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
       await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city)=> city.id !== id));
    } catch {
      alert("There was error deleting city...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesCotnext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesCotnext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesCotnext);
  if (context === undefined)
    throw new Error("Cities context are using otuside CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
