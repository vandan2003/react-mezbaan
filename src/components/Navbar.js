import { Link, useNavigate } from "react-router-dom"
import "./css/Navbar.css"
import NavPage from "./NavPage"
import { useState } from "react"
export default function Navbar() {

    const openNavPage = () => {
        setNavStatus(true);
    }
    const [navStatus, setNavStatus] = useState(false);
    return <>
        <nav id="navbar">
            <h1 id="brand-name">mezbaan</h1>
            {!navStatus && <span onClick={openNavPage}><i id="hamburger" className="fa-solid fa-bars"></i></span>}
            {navStatus && <NavPage navStatus={navStatus} setNavStatus={setNavStatus} />}
        </nav>

    </>
}