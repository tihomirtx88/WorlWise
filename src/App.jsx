import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Homepages from "./pages/Homeproduct"
import Pricing from "./pages/Pricing"
import PageNotFount from "./pages/PageNotFount"
import AppLayout from "./pages/AppLayout"

function App() {


  return (
     <BrowserRouter>
       <Routes>
         <Route path="product" element={<Product/>}/>
         <Route path="/" element={<Homepages/>}/>
         <Route path="pracing" element={<Pricing/>}/>
         <Route path="app" element={<AppLayout/>}/>
         <Route path="*" element={<PageNotFount/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App
