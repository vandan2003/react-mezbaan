import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Card from "./Card";
import "./css/SearchResult.css"

export default function SearchResult() {
    const state = useLocation().state;

    console.log(state);
    const restaurants = state?.restaurants;
    return <>
        <Navbar />
        <div className="search-bar-holder">
            <SearchBar />
        </div>

        <div id="search-result-container" className="container-fluid">
            <div className="row" id="result-data">
                {restaurants?.map((rest, index) => <Card rest={rest} index={index} />)}
            </div>
        </div>
        <Outlet/>
    </>
}