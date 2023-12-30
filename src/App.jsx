import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFount from "./pages/PageNotFount";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

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
          <Route index element={<CityList cities={cities} loading={loading}/>} />
          <Route path="cities" element={<CityList cities={cities} loading={loading}/>} />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>form</p>} />
        </Route>
        <Route path="*" element={<PageNotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
