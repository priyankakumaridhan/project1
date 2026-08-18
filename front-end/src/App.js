import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
import PrivateComponent from './components/PrivateComponents.js';
import Login from './components/Login.js'
import AddProduct from './components/AddProduct.js'
import PRODUCTS from './components/ProductList.js'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element = {<PrivateComponent/>}>
        <Route path="/update" element={<h1>This is my Update Product</h1>}/>
        <Route path="/about" element={<h1>This is my About page</h1>}/>
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
