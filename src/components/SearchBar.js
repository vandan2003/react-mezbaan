import { useRef, useState } from "react"
import "./css/SearchBar.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../WebApi/api";
import Loader from "./Loader";
import _ from "lodash";

export default function SearchBar({ restaurants, setRestaurants }) {
    var searchBar = useRef();
    const navigate = useNavigate();
    const [apiLoading, setApiLoading] = useState(false);

    const fetchLocation = () => {

    }

    const [suggestions, setSuggestions] = useState([]);



    const searchRestaurants = async () => {
        setApiLoading(true);
        let response = await axios.post(api.SEARCH_RESTAURANTS, { key: searchBar.value })
        if (response.data.status) {
            console.log(response.data.res)
            restaurants ? setRestaurants(response.data.res) : navigate("/restaurant-search", { state: { restaurants: response.data.res } });
            setApiLoading(false);
        }
        else
            window.alert("Server error");
    }

    const suggestRestaurants = async () => {
        if (searchBar.value) {
            let response = await axios.post(api.SEARCH_RESTAURANTS, { key: searchBar.value })
            if (response.data.status) {
                setSuggestions(response.data.res)
            }
        }
        else
            setSuggestions([]);

    }

    const myDebounce = _.debounce(suggestRestaurants, 300);

    return <>
        {apiLoading && <Loader />}
        <div id="main-search" className=" mb-3  row">
            <div className="col-12 row input-group p-0">
                <button id="location-btn" type="button" className="dropdown-toggle input-group-text col-4  col-sm-5 col-md-4 col-lg-4" data-bs-toggle="dropdown">
                    <i className="fas fa-map-marker-alt"></i>
                    Scheme
                    no. 140 , Indore
                </button>
                <ul id="dropdown-menu" className="dropdown-menu dropdown-menu-bottom">
                    <li> <a className="dropdown-item" onClick={fetchLocation}><i className='fas fa-crosshairs'></i> Detect Your Location </a></li>
                    <hr />
                    <li><a className="dropdown-item" href="#">Select Custom</a></li>
                </ul>
                <input type="text" onBlur={()=>setTimeout(()=>{setSuggestions([])},500)}  onKeyUp={() => myDebounce()} ref={search => searchBar = search} className="form-control col-10 col-sm-10 col-md-7 col-lg-7" placeholder="restaurant , cuisine , location" />

                <button id="search-btn" onClick={searchRestaurants} className="input-group-text col-2 col-sm-2 col-md-1 col-lg-1" type="button"><i className="fa fa-search"></i></button>
            </div>


            <div className="col-12 row p-0">
                <div id="invi-space" className="col-4  col-sm-5 col-md-4 col-lg-4"></div>
                <div id="search-result-bar" className="col-10 col-sm-10 col-md-7 col-lg-7">
                    {suggestions?.map(rest => <h6 onClick={(e) => {
                        searchBar.value = e.target.innerText;
                        navigate("/restaurant",{state:{rest}})
                    }}> <i className="fa fa-search"></i>&nbsp;&nbsp;{rest.name.substring(0,20) +" | "+rest.address.details.substring(0,25)}</h6>)}
                </div>
                <div className="col-2 col-sm-2 col-md-1 col-lg-1"></div>
            </div>
        </div>

    </>

}
