import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Card from "./Card";
import "./css/SearchResult.css"
import { useState } from "react";

export default function SearchResult() {
    const state = useLocation().state;
    const [restaurants, setRestaurants] = useState(state?.restaurants);



    const sortByPrice = (low) => {
        if (low)
            setRestaurants([...restaurants.sort((rest1, rest2) => rest1.avgCostPer2 - rest2.avgCostPer2)]);
        else
            setRestaurants([...restaurants.sort((rest1, rest2) => rest1.avgCostPer2 - rest2.avgCostPer2)].reverse());
        console.log(restaurants);
    }

    const sortByRating = (low) => {
        setRestaurants([...restaurants.sort((rest1, rest2) => rest1.rating - rest2.rating)].reverse());
    }

    return <>
        <Navbar />
        <div className="row s-head-content">
            <div className="search-bar-holder col-8">
                <SearchBar restaurants={restaurants} setRestaurants={setRestaurants} />
            </div>
            <div id="filter-holder" className="col-4 text-center d-flex pt-3">
                <div className="dropdown mr-5">
                    <button className="btn btn-danger btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" width="18" height="18" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img" className="sc-rbbb40-0 iwHbVQ"><title>filter</title>
                            <path d="M2.14 6.42h7.26c0.353 1.207 1.45 2.074 2.75 2.074s2.397-0.867 2.745-2.054l0.005-0.020h2.96c0.343-0.059 0.6-0.355 0.6-0.71s-0.258-0.651-0.596-0.709l-0.004-0.001h-2.94c-0.341-1.226-1.447-2.11-2.76-2.11s-2.419 0.885-2.755 2.090l-0.005 0.020h-7.26c-0.343 0.059-0.6 0.355-0.6 0.71s0.257 0.651 0.596 0.709l0.004 0.001zM12.16 4.28c0.776 0.011 1.4 0.643 1.4 1.42 0 0.784-0.636 1.42-1.42 1.42-0.777 0-1.409-0.624-1.42-1.399l-0-0.001c-0-0.006-0-0.013-0-0.020 0-0.784 0.636-1.42 1.42-1.42 0.007 0 0.014 0 0.021 0l-0.001-0zM17.86 13.58h-7.24c-0.328-1.245-1.443-2.148-2.77-2.148s-2.442 0.903-2.766 2.128l-0.004 0.020h-2.94c-0.036-0.006-0.077-0.010-0.12-0.010-0.398 0-0.72 0.322-0.72 0.72s0.322 0.72 0.72 0.72c0.042 0 0.084-0.004 0.124-0.011l-0.004 0.001h2.96c0.353 1.207 1.45 2.074 2.75 2.074s2.397-0.867 2.745-2.054l0.005-0.020h7.26c0.343-0.059 0.6-0.355 0.6-0.71s-0.258-0.651-0.596-0.709l-0.004-0.001zM7.84 15.72c-0.776-0.011-1.4-0.643-1.4-1.42 0-0.784 0.636-1.42 1.42-1.42 0.777 0 1.409 0.624 1.42 1.399l0 0.001c0 0.006 0 0.013 0 0.020 0 0.784-0.636 1.42-1.42 1.42-0.007 0-0.014-0-0.021-0l0.001 0z"></path>
                        </svg>
                        &nbsp;Filter
                    </button>
                    <ul className="dropdown-menu">
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-danger btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
                        <i className="fa-solid fa-bars-staggered"></i>&nbsp;
                        Sort
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={() => sortByPrice(true)}>Price  : Low to High</li>
                        <li onClick={() => sortByPrice(false)}>Price  : High to Low</li>
                        <li>Popularity</li>
                        <li onClick={sortByRating}>Rating : High to Low</li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="search-result-container" className="container-fluid">
            <div className="row" id="result-data">
                {restaurants?.map((rest, index) => <Card rest={rest} index={index} />)}
            </div>
        </div>
        <Outlet />
    </>
}