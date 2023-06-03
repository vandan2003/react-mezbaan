import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./css/Home.css"
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { ToastContainer } from "react-toastify";
import Loader from "./Loader";
import api from "../WebApi/api";


export default function Home() {
    const { atYourCity, topRatedFour } = useSelector((state) => state.restaurants);
    const navigate = useNavigate();
    const [apiLoading, setApiLoading] = useState(false);

    useEffect(() => {

    }, []);

    const searchByCuisine = async (cuisine) => {
        setApiLoading(true);
        let response = await axios.post(api.SEARCH_RESTAURANTS, { key: cuisine });
        navigate("/restaurant-search", { state: { restaurants: response.data.res } });
    }

    const viewRestaurant = (rest) => {
        navigate("/restaurant", { state: { rest } });
    }

    return <>
        {apiLoading && <Loader />}
        <Navbar />
        <ToastContainer />
        <div id="mainImgHolder">
            <img id="mainImg" src="/mezban-images/main4.jpg" alt="" />
            <div id="main-img-cover" className="my-cover">
                <div id="main-search-content">
                    <p className="first-heading">Best Restaurants for you</p>
                    <SearchBar />
                </div>
            </div>
        </div>
        <div className="" id="multi-cuisines">
            <h2>Multi Cuisines</h2><div className="col-8"></div>
            <div className="cuisines-container">
                <div  className=" cuisine-card-holder">
                    <div className="card-hover">
                        <div className="card-hover__content">
                            <h3 className="card-hover__title">
                                South Indian <span>food</span> for you!
                            </h3>
                            <a onClick={() => searchByCuisine("South Indian")} className="card-hover__link">
                                <span>See Now</span>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                        <div className="card-hover__extra">
                            <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                        </div>
                        <img style={{ width: "100%" }} src="/mezban-images/SouthIndian_Cuisine.jpg" alt="" />
                    </div>
                </div>
                <div className=" cuisine-card-holder">
                    <div className="card-hover">
                        <div className="card-hover__content">
                            <h3 className="card-hover__title">
                                Taste from <span>north</span>&nbsp;for&nbsp;you!
                            </h3>
                            <a onClick={() => searchByCuisine("North Indian")} className="card-hover__link">
                                <span>See Now</span>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                        <div className="card-hover__extra">
                            <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                        </div>
                        <img style={{ width: "100%" }} src="/mezban-images/NorthIndian.Cuisine2.jpg" alt="" />
                    </div>
                </div>
                <div className=" cuisine-card-holder">
                    <div className="card-hover">
                        <div className="card-hover__content">
                            <h3 className="card-hover__title">
                                Spicy&nbsp;Chinese <span>cuisine</span>&nbsp;for&nbsp;you!
                            </h3>
                            <a onClick={() => searchByCuisine("Chinese")} className="card-hover__link">
                                <span>See Now</span>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                        <div className="card-hover__extra">
                            <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                        </div>
                        <img style={{ width: "100%" }} src="/mezban-images/Chinese_Cuisine.jpg" alt="" />
                    </div>
                </div>
                <div className=" cuisine-card-holder">
                    <div className="card-hover">
                        <div className="card-hover__content">
                            <h3 className="card-hover__title">
                                Sweetest&nbsp;of <span>sweets</span>&nbsp;for&nbsp;you!
                            </h3>
                            <a onClick={() => searchByCuisine("Mithai")} className="card-hover__link">
                                <span>See Now</span>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </div>
                        <div className="card-hover__extra">
                            <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                        </div>
                        <img style={{ width: "100%" }} src="/mezban-images/Mithai_Cuisine.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div className="" id="top-rated">
            <h2>Top Rated</h2><div className="col-8"></div>

            <div className="top-rest-container">
                {
                    topRatedFour?.map((restaurant, index) => {
                        return <div key={index} className="cuisine-card-holder">
                        <div className="card-hover">
                            <div className="card-hover__content">
                                <span className="card-rating">{restaurant.rating}</span>

                                <h3 className="card-hover__title" style={{ fontSize: "20px", width: "100%", textDecoration: "underline", textDecorationColor: "#ff3838" }}>
                                    {restaurant.name.substring(0, 20)}
                                </h3>
                                <a onClick={() => { viewRestaurant(restaurant) }} className="card-hover__link">
                                    <span>Book Now</span>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            </div>
                            <div className="card-hover__extra">
                                <h4>Learn <span>now</span> and get <span>40%</span> discount!</h4>
                            </div>
                            <img style={{ width: "100%" }} src={"http://localhost:3000/image/" + restaurant.images[0]} alt="" />
                        </div>
                    </div>
                    })
                }
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12 col-lg-4 serv-box">
                <img className="service-img" src="/mezban-images/serv1.jpg" alt="" />
            </div>
            <div className="col-sm-12 col-lg-4 serv-box">
                <img className="service-img" src="/mezban-images/serv2.jpg" alt="" />
            </div>
            <div className="col-sm-12 col-lg-4 serv-box">
                <img className="service-img" src="/mezban-images/serv3.jpg" alt="" />
            </div>
        </div>



        <div id="at-your-city-bg" className="mt-5">
            <div id="cover-2-content">
                <h1>At your city  <i className="fas fa-map-marker-alt"></i></h1>
                <div className="city-rest-container">
                    {
                        atYourCity.map((rest, index) => {
                            return <Card rest={rest} key={index} index={index} />
                        })
                    }
                </div>

            </div>

            <img id="at-your-city-bg-img" src="/mezban-images/main1.jpg" alt="" />
            <div id="cover-2">

            </div>
        </div>
        <Outlet />
    </>
}