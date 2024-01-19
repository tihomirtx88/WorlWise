import { createContext, useContext, useEffect, useState } from "react";

const CitiesCotnext = createContext();

function CitiesProvider({children}){
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

    async function getCity(id){
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();

            setCurrentCity(data);
          } catch {
            alert("There was error loading data...");
          } finally {
            setLoading(false);
          }
    }

    return(
        <CitiesCotnext.Provider value={{
            cities, loading, currentCity, getCity
        }}>
            {children}
        </CitiesCotnext.Provider>
    );
}

function useCities(){
    const context = useContext(CitiesCotnext);
    if(context === undefined) throw new Error('Cities context are using otuside CitiesProvider');
    return context;
}

export {CitiesProvider, useCities};