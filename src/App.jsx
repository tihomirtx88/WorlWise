import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Homepages from "./pages/Homeproduct"
import Pricing from "./pages/Pricing"

function App() {


  return (
     <BrowserRouter>
       <Routes>
         <Route path="product" element={<Product/>}/>
         <Route path="homepage" element={<Homepages/>}/>
         <Route path="pracing" element={<Pricing/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App
