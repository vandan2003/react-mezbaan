import { Link, useNavigate } from "react-router-dom";
import "./css/NavPage.css"
import SignIn from "./SignIn";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux-config/user-slice";
export default function NavPage({ navStatus, setNavStatus, signInPageStatus, setSignInPageStatus }) {
    let navOverlay;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeNavpage = () => {
        navOverlay.style.transform = "translate(0px,-100vh)";

        setTimeout(() => {
            setNavStatus(false)
        }, 1000);
    }

    const signout = ()=>{
        dispatch(signOut());
        navigate("/");
        setNavStatus(false);
    }


    return <div ref={navpage => navOverlay = navpage} id="nav-overlay" className="my-overlay">
        <div className="cross" onClick={closeNavpage}><i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div id="nav-menu">
            <Link to="/" style={{ textDecoration: 'none' }}><h3 className="navLink">Home</h3></Link>
            <h3 className="navLink">Contact</h3>
            <h3 className="navLink">Restaurants</h3>
            <Link to="/profile"><h3 className="navLink">Profile</h3></Link>
            <button className="btn btn-danger" onClick={signout}>Sign Out</button>
        </div>
    </div>
}