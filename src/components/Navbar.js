import { Link, useNavigate } from "react-router-dom"
import "./css/Navbar.css"
import NavPage from "./NavPage"
import { useState } from "react"
import SignIn from "./SignIn"
import { useSelector } from "react-redux"
export default function Navbar() {
    const openNavPage = () => {
        setNavStatus(true);
    }

    
    const [navStatus, setNavStatus] = useState(false);
    var [signInPageStatus,setSignInPageStatus] = useState(false);
    const user = useSelector(state=>state.user).currentUser;
    
        
    
    return <>
        <nav id="navbar">
            <Link to="/" id="brand-name">mezbaan</Link>
            {!user?<div><Link className="navigationLink" to="/signin">Sign In</Link><Link to="/signup" className="navigationLink" >Sign Up</Link></div>:
            !navStatus && <span onClick={openNavPage}><i id="hamburger" className="fa-solid fa-bars"></i></span>}
            {navStatus && <NavPage navStatus={navStatus} setNavStatus={setNavStatus} signInPageStatus={signInPageStatus} setSignInPageStatus={setSignInPageStatus} />}
            {signInPageStatus&&<SignIn signInPageStatus={signInPageStatus} setSignInPageStatus={setSignInPageStatus}/>}
        </nav>

    </>
}