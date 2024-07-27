import './App.css';
import Register from './pages/form';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/products'
import Loginform from './pages/login';
import Navigation from './components/navigation';
import ProductProvider from './context/state-manage';
import Cartpage from './components/cartpage';
import Forgetpassword from './pages/forgetpassword';
import Resetpassword from './pages/resetpassword';



function App() {
  return (
    <div className='main-app'>
    <ProductProvider>
          <Cartpage />
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/products" element={<Products />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Loginform />} />
      <Route path="/logout" />
      <Route path="/isloggedin" />
      <Route path="forgetpassword" element={ <Forgetpassword />} />
      <Route path="resetpassword/*" element={ <Resetpassword />} />
    </Routes>

  </BrowserRouter>
  </ProductProvider>
  </div>
  );
}
export default App;
