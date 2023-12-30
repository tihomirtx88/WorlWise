import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import PageNotFount from "./pages/PageNotFount"
import AppLayout from "./pages/AppLayout"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"

function App() {


  return (
     <BrowserRouter>
       <Routes>
         <Route index element={<Homepage/>}/>
         <Route path="product" element={<Product/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="pracing" element={<Pricing/>}/>
         <Route path="app" element={<AppLayout/>}>
          {/* If case no one of child routes are not executed */}
           <Route index element={<p>List of cities</p>}/>
           <Route path="cities" element={<p>List of cities</p>}/>
           <Route path="countries" element={<p>List of countries</p>}/>
           <Route path="form" element={<p>form</p>}/>
         </Route>
         <Route path="*" element={<PageNotFount/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App
