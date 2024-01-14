import { createContext, useContext, useEffect, useState } from "react";

const CitiesCotnext = createContext();

function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const BASE_URL = "http://localhost:9000";
  
    useEffect(() => {
      async function fetchCities() {
        setLoading(true);
        try {
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await res.json();
          console.log(data);
          setCities(data);
        } catch {
          alert("There was error loading data...");
        } finally {
          setLoading(false);
        }
      }
      fetchCities();
    }, []);

    return(
        <CitiesCotnext.Provider value={{
            cities, loading
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