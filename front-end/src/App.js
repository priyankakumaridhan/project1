import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
import PrivateComponent from './components/PrivateComponents.js';
import Login from './components/Login.js'
import AddProduct from './components/AddProduct.js'
import PRODUCTS from './components/ProductList.js'
import UPDATE_PRODUCT from './components/UpdateProduct.js'
import About from './components/About.js'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element = {<PrivateComponent/>}>
        <Route path="/update/:id" element={<UPDATE_PRODUCT/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/product" element={<PRODUCTS/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/logout" element={<h1>logout page</h1>}/>
        </Route>

        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
