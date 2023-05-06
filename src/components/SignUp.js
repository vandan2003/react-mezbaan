import { Link, useNavigate } from "react-router-dom";
import "./css/NavPage.css"
import "./css/SignIn.css"
import axios from "axios";
import api from "../WebApi/api";
import { useRef } from "react";
import { setUser } from "../redux-config/user-slice";
import { useDispatch } from "react-redux";
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import "./css/SignUp.css"
import { toast } from "react-toastify";



function SignUp(props) {
    const navigate = useNavigate();
    let emailField = useRef();
    let passwordField = useRef();
    let nameField = useRef();
    let confirmField = useRef();
    let contactField = useRef();
    let setSignInPageStatus = props.setSignInPageStatus;
    let signInPageStatus = props.signInPageStatus;

    let signInOverlay;
    const closeSignInpage = () => {
        signInOverlay.style.transform = "translate(0px,-100vh)";
        setTimeout(() => {
            props.flag ? navigate("/") : setSignInPageStatus(false);
        }, 1000);
    }

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                let data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { "Authorization": `Bearer ${tokenResponse.access_token}` } })
                console.log(data);
                let response = await axios.post(api.GOOGLE_SIGNIN, { email: data.data.email });
                console.log(response);
            } catch (err) {
                if (err.request.status == 400) {
                    window.alert("User not found , SignUp First");
                }
                else
                    window.alert("Something went wrong . . .");
            }
        }
    });

    if (props.flag)
        signInPageStatus = props.flag;

    const signUp = async () => {
        let name = nameField.value.trim();
        let password = passwordField.value.trim();
        let confirmPassword = confirmField.value.trim();
        let contact = contactField.value.trim();
        let email = emailField.value.trim();

        try {
            let response = await axios.post(api.USER_SIGN_UP, { name, email, password, contact });

            if (response.data.status) {
                toast.success("Sign Up Success")
                navigate("/signin")
            }
        } catch (err) {
            console.log(err);
            window.alert("Something Went Wrong");
        }
    }

    return <>
        <div ref={signin => signInOverlay = signin} id="signin-overlay" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} className="my-overlay">

            <div id="signin-box" className="row">
                <div className="cross" style={{ color: "#464646" }} onClick={closeSignInpage}><i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <div id="bg-image" className="col-5">
                </div>
                <div className="col-7 mt-2">
                    <h3>Sign Up </h3>
                    <hr />
                    <div className="row">
                        <div id="signup-form-fields" className="col-12 p-3">
                            <label >Full Name</label>
                            <input type="text" ref={name => nameField = name} className="form-control" placeholder="full name" />
                            <label >Email</label>
                            <input type="email" ref={mail => emailField = mail} className="form-control" placeholder="email" />
                            <label >Contact</label>
                            <input type="tel" ref={contact => contactField = contact} className="form-control" placeholder="mobile number" />
                            <label>Password</label>
                            <input type="password" ref={pass => passwordField = pass} className="form-control" placeholder="password" />
                            <label >Confirm Password</label>
                            <input type="password" ref={cpass => confirmField = cpass} className="form-control" placeholder="confirm password" />
                            <button onClick={signUp} className="btn btn-primary btn-sm mt-3">Sign In</button>
                            <hr />
                            <center>
                                <button id="google-login-btn" className="" onClick={login}>
                                    Sign in with Google
                                </button>
                            </center>
                        </div>

                    </div>

                </div>
            </div>
            <div>
            </div>


        </div>
    </>

}

export default SignUp;