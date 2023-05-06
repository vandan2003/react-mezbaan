import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "./css/UserProfile.css"
import { Link, Outlet } from "react-router-dom";
import SmallCard from "./SmallCard";
import { ToastContainer } from "react-toastify";
export default function UserProfile() {
    const user = useSelector(state => state.user.currentUser);

    const toggleSidebar = () => {
        document.getElementById("sidebar").classList.toggle("display");
    }
    return <>
        <Navbar />
        <ToastContainer/>
        <button onClick={toggleSidebar} id="sidebar-toggler">X</button>

        <div id="main-container" className="container-fluid row pt-5">
            <div id="sidebar">
                <div className="row" id="account-details-section">
                    <div className="col-12 pt-2">
                        <h3 className="sidenav-heading">Account Details</h3>
                        <h4 className="acc-details">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            {user.name}
                        </h4>
                        <h4 className="acc-details">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            {user.contact}
                        </h4>
                        <h4 className="acc-details">

                            <i className="fa-solid fa-envelope"></i>{user.email.substring(0, 18)}</h4>
                    </div>
                </div>
                <hr />
                <div id="user-options-section">
                    <h3 className="sidenav-heading">Activities</h3>
                    <div>
                        <h4 className="user-option">
                            <Link to="/profile/" >
                                Recent Visits
                            </Link>
                        </h4>
                        <h4 className="user-option">
                            <Link to="/profile/favourites">
                                Favourites
                            </Link>
                        </h4>
                        <h4 className="user-option">
                           <Link to="/profile/bookings"> Bookings</Link>
                        </h4>
                        <h4 className="user-option">
                            Reviews
                        </h4>
                    </div>
                </div>
            </div>
            <div id="profile-content" className="col-12">
                <Outlet />
            </div>
        </div>
    </>
}