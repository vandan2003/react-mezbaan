import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/NavPage.css"
import "./css/SignIn.css"
import axios from "axios";
import api from "../WebApi/api";
import { useRef } from "react";
import { getBookings, getVisits, googleLogin, setUser } from "../redux-config/user-slice";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";



function SignIn(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let emailField = useRef();
    let passwordField = useRef();
    let msg = useLocation().state?.msg;
    let setSignInPageStatus = props.setSignInPageStatus;
    let signInPageStatus = props.signInPageStatus;
    const { isLoading, currentUser, error } = useSelector(state => state.user);
    let signInOverlay;
    const closeSignInpage = () => {
        navigate("/")
    }

    useEffect(() => {
        if (msg)
            toast.warning(msg);
    }, [])

    if (props.flag)
        signInPageStatus = props.flag;

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                let data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { "Authorization": `Bearer ${tokenResponse.access_token}` } })
                dispatch(googleLogin(data.data.email));
            } catch (err) {
                if (err.request.status == 400) {
                    window.alert("User not found , SignUp First");
                }
                else
                    window.alert("Something went wrong . . .");
            }
        }
    });

    const signIn = async () => {
        try {
            let response = await axios.post(api.USER_SIGN_IN, { email: emailField.value, password: passwordField.value });
            console.log(response);
            if (response.data.status) {
                toast.success("Sign in success");
                dispatch(setUser(response.data.result));
                dispatch(getVisits(response.data.result._id))
                dispatch(getBookings(response.data.result._id))
                props.flag ? navigate("/") : setSignInPageStatus(false);
            }
            else
                window.alert("Server Error");
        }catch(err){
            toast.error("SignIn Failed");
        }
    }


    return <>
        <ToastContainer />
        {currentUser && navigate("/")}
        {isLoading && <Loader />}
        <div ref={signin => signInOverlay = signin} id="signin-overlay" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} className="my-overlay">

            <div id="signin-box" className="row">
                <div className="cross" style={{ color: "#464646" ,zIndex:"100"}} onClick={closeSignInpage}><i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <div id="bg-image" className="col-6">
                </div>
                <div id="inner-box" className="col-6 mt-2">
                    <h3>Welcome Back !! </h3>
                    <hr />
                    <div className="row">
                        <div className="col-12 p-3">
                            <div>
                                <label id="label1" className="">Email</label>
                                <input id="input1" type="email" ref={mail => emailField = mail} className="form-control mb-2" placeholder="email" />
                            </div>
                            <label>Password</label>
                            <input type="password" ref={pass => passwordField = pass} className="form-control mb-2" placeholder="password" />
                            <button onClick={signIn} className="signin-btn btn-sm mt-3">Sign In</button>
                            <hr />
                            <center>
                                <button id="google-login-btn" className="" onClick={login}>
                                    Continue with Google
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

export default SignIn;