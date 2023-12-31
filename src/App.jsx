import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFount from "./pages/PageNotFount";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="pracing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          {/* If case no one of child routes are not executed */}
          <Route index element={<Navigate replace to="cities"/>} />
          <Route path="cities" element={<CityList cities={cities} loading={loading}/>} />
          <Route path="cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList cities={cities} loading={loading}/>} />
          <Route path="form" element={<Form/>} />
        </Route>
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
