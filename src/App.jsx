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
         <Route path="product" element={<Product/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="/" element={<Homepage/>}/>
         <Route path="pracing" element={<Pricing/>}/>
         <Route path="app" element={<AppLayout/>}/>
         <Route path="*" element={<PageNotFount/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App
