import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavPage from './components/NavPage';
import RestaurantPage from './components/RestaurantPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAtYourCity, fetchTopRatedFour } from './redux-config/restaurant-slice';
import SearchResult from './components/SearchResult';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Carousel from './components/Carousel';
import RecentVisit from './components/RecentVisit';
import BookingHistory from './components/BookingHistory';


function App() {
    const visits = useSelector(state=>state.user.visits);
    const user = useSelector(state=>state.user.currentUser);
    const bookings = useSelector(state=>state.user.bookings);
    
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      window.alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    window.alert("Latitude: " + position.coords.latitude +
      "Longitude: " + position.coords.longitude);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopRatedFour());
    dispatch(fetchAtYourCity("Indore"));
  }, []);

  return <div id='container' className='container-fluid'>
    <Routes>
    <Route path='/profile' element={<UserProfile/>} >
      <Route path='/profile' element={<RecentVisit visits={visits} heading={"Recently Viewed"} />}/>
      <Route path='/profile/favourites' element={<RecentVisit visits={user?.favourites} heading={"Favourites"}/>}/>
      <Route path='/profile/bookings' element={<BookingHistory bookings={bookings} heading={"Bookings"}/>}/>
    </Route>
      <Route path='/' element={<Home />} >
        <Route path='/signin' element={<SignIn flag={true}/>} />
        <Route path='/signup' element={<SignUp flag={true}/>} />
      </Route>
      <Route path='/restaurant' element={<RestaurantPage />} />
      <Route path='/restaurant/images' element={<Carousel/>}/>
      <Route path='/restaurant-search' element={<SearchResult />} />
    </Routes>
  </div>
}

export default App;
