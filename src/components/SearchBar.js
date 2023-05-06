import { useRef, useState } from "react"
import "./css/SearchBar.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../WebApi/api";
import Loader from "./Loader";

export default function SearchBar() {
    var searchBar = useRef();
    const navigate = useNavigate();
    const [apiLoading,setApiLoading] = useState(false);

    const fetchLocation = ()=>{
        
    }

    const searchRestaurants= async()=>{
        setApiLoading(true);
        let response = await axios.post(api.SEARCH_RESTAURANTS,{key:searchBar.value})
        if(response.data.status){
            // console.log(response.data);
            navigate("/restaurant-search",{state:{restaurants:response.data.res}})
            setApiLoading(false);
        }
        else
        window.alert("Server error");
    }
    return <>
    {apiLoading&&<Loader/>}
        <div id="main-search" className="input-group mb-3 input-group-sm row">
            <button id="location-btn" type="button" className="dropdown-toggle col-lg-4" data-bs-toggle="dropdown">
                <i className="fas fa-map-marker-alt"></i>
                Scheme
                no. 140 , Indore
            </button>
            <ul id="dropdown-menu" className="dropdown-menu dropdown-menu-bottom">
                <li> <a className="dropdown-item" onClick={fetchLocation}><i className='fas fa-crosshairs'></i> Detect Your Location </a></li>
                <hr />
                <li><a className="dropdown-item" href="#">Select Custom</a></li>
            </ul>
            <input type="text" ref={search=>searchBar=search} className=" col-lg-7" placeholder="restaurant , cuisine , location" />
            <button id="search-btn" onClick={searchRestaurants} className="col-lg-1" type="button"><i className="fa fa-search"></i></button>
        </div>
    </>

}
