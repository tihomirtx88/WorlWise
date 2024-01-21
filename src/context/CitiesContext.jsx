import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesCotnext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function reducer(state, action){
   switch (action.type) {
    case "loading":
      return{
        ...state,
        isLoading: true
      }
    case "city/loaded": 
      return{
        ...state,
        isLoading:false,
        currentCity: action.payload
      }
    case "cities/loaded": 
    return {
      ...state,
      isLoading:false,
      cities: action.payload
    }
    case "city/created":
      return{
        ...state,
        isLoading:false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case "city/deleted":
      return{
        ...state,
        isLoading:false,
        cities: state.cities.filter((city)=> city.id !== action.payload),
        currentCity: {}
      }
    case "rejected":
      return{
        ...state,
        isLoading: false,
        error: action.payload
      }
    default: throw new Error('Unknown action type'); 
   }
}

function CitiesProvider({ children }) {
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:9000";

  useEffect(() => {
    async function fetchCities() {
      dispatch({type: "loading"});
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data});
      } catch {
        dispatch({type: "rejected", payload:"There was error loading data..."});
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if(Number(id) === currentCity.id) return;
    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: "city/loaded", payload: data});
    } catch {
      dispatch({type: "rejected", payload:"There was error loading data..."});
    }
  }

  async function createCity(newCity) {
    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type: "city/created", payload:data});
    } catch {
      dispatch({type: "rejected", payload:"There was error creating city..."});
    }
  }

  async function deleteCity(id) {
    dispatch({type: "loading"});
    try {
       await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: "city/deleted", payload: id});
    } catch {
      dispatch({type: "rejected", payload:"There was error deleting city..."});
    }
  }

  return (
    <CitiesCotnext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
