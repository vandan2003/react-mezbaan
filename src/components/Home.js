import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./css/Home.css"
import SearchBar from "./SearchBar";

export default function Home() {
    const [restaurants, setRestaurants] = useState([])
    const init = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {

        }

        function showPosition(position) {
            console.log(position);
        }
    }



    useEffect(() => {
        init();
    }, []);

    return <>
        <Navbar />
        <div id="mainImgHolder">
            <img id="mainImg" src="/mezban-images/main4.jpg" alt="" />
            <div id="main-img-cover" className="my-cover">
                <div id="main-search-content">
                    <h1 className="first-heading">Best Restaurants near you</h1>
                    <SearchBar />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-4 serv-box">
                <img className="service-img" src="/mezban-images/serv1.jpg" alt="" />
            </div>
            <div className="col-4 serv-box">
                <img className="service-img" src="/mezban-images/serv2.jpg" alt="" />
            </div>
            <div className="col-4 serv-box">
                <img className="service-img" src="/mezban-images/serv3.jpg" alt="" />
            </div>
        </div>
        <div id="at-your-city-bg" className="mt-5">
            <img src="/mezban-images/main1.jpg" alt="" />
        </div>
        <div id="cover-2">
            <div id="cover-2-content">
                <h1>At your city  <i className="fas fa-map-marker-alt"></i></h1>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="restaurant-card">
                            <img src="/mezban-images/main.jpg" alt="" />
                            <div className="row">
                                <h3 className="col-9">Restaurants</h3>
                                <div className="col-3">
                                    <p className="rating">4.5</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-11">
                                    <p className="desc-restcard">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, velit harum!</p>
                                </div>
                            </div>
                            <div className="row">
                                <p className="card-price col-9">
                                    400 RS.
                                </p>
                                <abbr title="view more" className="col-3 view-eye">
                                    <Link to="/restaurant"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                                </abbr>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="restaurant-card">
                            <img src="/mezban-images/main.jpg" alt="" />
                            <div className="row">
                                <h3 className="col-9">Restaurants</h3>
                                <div className="col-3">
                                    <p className="rating">4.5</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-11">
                                    <p className="desc-restcard">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, velit harum!</p>
                                </div>
                            </div>
                            <div className="row">
                                <p className="card-price col-9">
                                    400 RS.
                                </p>
                                <abbr title="view more" className="col-3 view-eye">
                                    <Link to="/restaurant"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                                </abbr>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="restaurant-card">
                            <img src="/mezban-images/main.jpg" alt="" />
                            <div className="row">
                                <h3 className="col-9">Restaurants</h3>
                                <div className="col-3">
                                    <p className="rating">4.5</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-11">
                                    <p className="desc-restcard">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, velit harum!</p>
                                </div>
                            </div>
                            <div className="row">
                                <p className="card-price col-9">
                                    400 RS.
                                </p>
                                <abbr title="view more" className="col-3 view-eye">
                                    <Link to="/restaurant"><i class="fa fa-eye" aria-hidden="true"></i></Link>
                                </abbr>
                            </div>
                        </div>
                    </div>
                    <div className="col-10"></div>
                    <div className="col-2 mt-4">
                    <button className="btn btn-danger myBtn">See more </button>
                    </div>
                </div>
                
            </div>
        </div>
    </>
}