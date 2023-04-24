import "./css/SearchBar.css"

export default function SearchBar() {
    const fetchLocation = ()=>{
        
    }
    return <>
        <div id="main-search" className="input-group mb-3 input-group-sm row">
            <button id="location-btn" type="button" className="dropdown-toggle col-lg-4" data-bs-toggle="dropdown">
                <i className="fas fa-map-marker-alt"></i>
                Scheme
                no. 140 , Indore
            </button>
            <ul id="dropdown-menu" className="dropdown-menu">
                <li> <a className="dropdown-item" onClick={fetchLocation}><i className='fas fa-crosshairs'></i> Detect Your Location </a></li>
                <hr />
                <li><a className="dropdown-item" href="#">Select Custom</a></li>
            </ul>
            <input type="text" className="form-control col-lg-7" placeholder="restaurant , cuisine , location" />
            <button id="search-btn" className="col-lg-1" type="button"><i className="fa fa-search"></i></button>
        </div>
    </>
}