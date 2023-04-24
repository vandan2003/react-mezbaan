import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavPage from './components/NavPage';
import RestaurantPage from './components/RestaurantPage';


function App() {
  return <div id='container' className='container-fluid'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/restaurant' element={<RestaurantPage />} />
    </Routes>
  </div>
}

export default App;
