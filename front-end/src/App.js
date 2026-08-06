import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import SignUp from './components/SignUp.js'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/home" element={<h1>This is my Home page</h1>}/>
        <Route path="/about" element={<h1>This is my About page</h1>}/>
        <Route path="/product" element={<h1>This is my Product page</h1>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
