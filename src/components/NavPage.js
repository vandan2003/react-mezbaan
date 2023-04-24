import { Link } from "react-router-dom";
import "./css/NavPage.css"
export default function NavPage({navStatus,setNavStatus}) {
    let navOverlay;
    const closeNavpage = ()=>{
        navOverlay.style.transform = "translate(0px,-100vh)";
        
        setTimeout(() => {
            setNavStatus(false)
        }, 1000);
    }
    
    return <div ref={navpage => navOverlay = navpage} id="nav-overlay" className="my-overlay">
        <div className="cross" onClick={closeNavpage}><i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div id="nav-menu">
            <Link to="/" style={{textDecoration:'none'}}><h3 className="navLink">Home</h3></Link>
            <h3 className="navLink">Contact</h3>
            <h3 className="navLink">Restaurants</h3>
            <h3 className="navLink">Profile</h3>
        </div>
    </div>
}