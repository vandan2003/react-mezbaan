import { useEffect, useRef, useState } from "react";
import Map from "./Map";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import "./css/RestaurantPage.css"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../WebApi/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { addFavourite, removeFavourite, setUser } from "../redux-config/user-slice";
import Carousel from "./Carousel";


export default function RestaurantPage() {
    const { state } = useLocation();
    const restaurant = state.rest;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bookingTime, setBookingTime] = useState("");
    const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10))
    const [guestsNo, setGuestsNo] = useState("1");
    const [showImages, setShowImages] = useState(false);
    const [showMenus, setShowMenus] = useState(false);
    let user = useSelector(state => state.user.currentUser)
    let extraInfo = useRef();

    const selectTime = (obj) => {
        setBookingTime(obj.target.innerText);
    }

    const addToFavourite = async () => {
        if (!user)
            navigate("/signin");
        else {
            let addedResponse = await axios.post(api.ADD_TO_FAVOURITE, { resId: restaurant._id, cusId: user._id })

            if (addedResponse.data.status) {
                toast.success("Added to favourites");
                dispatch(addFavourite(addedResponse.data.favourite));
            }

            else {
                let removedResponse = await axios.post(api.REMOVE_FROM_FAVOURITES, { resId: restaurant._id, cusId: user._id })
                if (removedResponse.data.status) {
                    toast.warning("Removed from favorites");
                    dispatch(removeFavourite(restaurant._id));
                }
            }
        }
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const bookMyTable = async (restaurant) => {
        if (!user) {
            navigate("/signin", { state: { msg: "Sign in to perfom this action !!" } });
        }
        else {
            if (!bookingTime) {
                toast.error("Must Select Booking Time !!");
            }
            else {
                let response = await axios.post("http://localhost:3000/payment/pay", { amount: document.getElementById("amount").innerText });

                if (response.status != 200)
                    window.alert("Something Went Wrong");
                else {
                    let data = response.data
                    const options = {
                        key: "rzp_test_Vhg1kq9b86udsY",
                        currency: data.currency,
                        amount: data.amount,
                        name: "Mezbaan",
                        description: "Book Your Table",
                        image: "https://tse2.mm.bing.net/th?id=OIP.4p7ztcUW4gAM6_1VGZ1EVwHaIj&pid=Api&P=0",
                        order_id: data.id,
                        handler: async function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature);
                            try {
                                let bookingResponse = await axios.post(api.SAVE_BOOKING, { customerId: user._id, restaurantId: restaurant._id, date: bookingDate, time: bookingTime, extraInfo: extraInfo.value, bookingAmount: data.amount / 100, totalGuests: guestsNo });
                                if (bookingResponse.data.status) {
                                    window.alert("Booking Success");
                                    toast.success("Booking Success");
                                    navigate("/");
                                }
                            } catch (err) {
                                toast.error("Something went wrong !!");
                                window.alert("Something went wrong !!")
                                navigate("/");
                            }
                        },
                        theme: {
                            color: "#ff3333"
                        }
                    };
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();


                }
            }
        }
    }

    const calcTime = (openingTime, closingTime) => {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString("en-US");
        const date1 = new Date(dateString + " " + openingTime);
        const date2 = new Date(dateString + " " + closingTime);
        const diffMs = date2 - date1;

        const timeIntervals = [];

        // Loop through the intervals and format each one as a time string
        for (let time = date1; time <= date2; time.setMinutes(time.getMinutes() + 30)) {
            let timing = time.toLocaleTimeString("en-US", { hour12: true }).split(":");
            let slot = timing[0] + ":" + timing[1] + " " + timing[2].split(" ")[1];
            if (!isPassedTime(slot))
                timeIntervals.push(slot);
        }


        const diffIntervals = Math.floor(diffMs / 1800000); // 1 interval = 1800000 ms

        return timeIntervals;
    }

    const isPassedTime = (inputTimeString) => {
        const customDate = new Date(bookingDate);
        const inputTime = new Date(`${customDate.toDateString()} ${inputTimeString}`);
        const currentTime = new Date();

        if (inputTime < currentTime)
            return true;
        return false;
    }

    const viewImages = () => {
        setShowImages(true);
    }

    const addVisit = async () => {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString("en-US");
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        await axios.post(api.ADD_VISIT, { customerId: user._id, restaurantId: restaurant._id, date: dateString, time: currentTime })
    }

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (user) {
            addVisit();
        }
    }, []);


    return <>
        {showImages && <Carousel images={restaurant.images} setFlag={setShowImages} />}
        {showMenus && <Carousel images={restaurant.menus} setFlag={setShowMenus} />}

        <div id="rest-container" className="container-fluid">


            <ToastContainer />
            <Navbar />
            <div className="search-bar-holder">
                <SearchBar />
            </div>

            <div id="rest-img-container" className="row">
                <div className="col-7">
                    <img id="mainImg" src="/mezban-images/main.jpg" alt="" />
                </div>
                <div className="col-5">
                    <div className="row">
                        {restaurant.images.map((image, index) => {
                            return <div key={index} style={{ height: restaurant.images.length * 50 + 'px' }} className={"sideImgHolder col-" + (12 / restaurant.images.length * 2)}>
                                <img className="sideImg" onClick={() => viewImages(restaurant.images)} src={"mezban-images/" + image} alt="Image" />
                            </div>
                        })}
                    </div>
                </div>
                <div className="col-9">
                    <h1 id="rest-name">{restaurant.name}</h1>
                    <div className="row">
                        <div className="col-4">
                            <p className="sm-headings">Open from {restaurant.openingTime + " to " + restaurant.closingTime}</p>
                        </div>
                        <div className="col-4">
                            <p className="sm-headings">Booking Charges &#8377; {+restaurant.avgCostPer2} </p>
                        </div>
                        <div className="col-4">

                        </div>
                    </div>

                </div>
                <div className="col-2" id="options">
                    <abbr title="Menu">
                        <span onClick={() => setShowMenus(true)}><i className="fa-solid fa-list"></i></span>&nbsp;&nbsp;
                    </abbr>
                    {
                        user?.favourites.some((fav) => fav.restaurantId._id == restaurant._id) ? <span style={{ color: "red" }} id="favourite" onClick={addToFavourite}>
                            <abbr title="favourite"><i className="fa fa-heart"></i></abbr>
                        </span>
                            : <span id="favourite" onClick={addToFavourite}>
                                <abbr title="favourite"><i className="fa-sharp fa-regular fa-heart"></i></abbr>
                            </span>
                    }
                </div>
                <div className="col-12">
                    <hr />
                    <div className="row container m-auto " >
                        <div className="col-7 p-4">

                            <h3>Description</h3>
                            <p id="description">
                                {restaurant.description}
                            </p>
                            <div className="row ">
                                <div id="cuisines-div" className="col-5">
                                    <h3>Cuisines</h3>
                                    <p>
                                        {
                                            restaurant.cuisines.map((cuisine, index) => index ? " , " + cuisine : cuisine)
                                        }
                                    </p>
                                </div>
                                <div id="facilities-div" className="col-5">
                                    <h3>Facilities</h3>
                                    <p>
                                        {
                                            restaurant.facilities.map((facility, index) => index ? " , " + facility : facility)
                                        }
                                    </p>
                                </div>
                            </div>




                            <div id="detailsBox" className="row">
                                <div className="col-6">
                                    <h4  > <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;+91 {restaurant.contact}</h4>
                                </div>
                                <div className="col-6">
                                    <h4><i className="fa fa-envelope" aria-hidden="true"></i>&nbsp;{restaurant.email.substring(0, 30)}</h4>
                                </div>
                                <div className="col-12">
                                    <h4><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp;{restaurant.address.details + "," + restaurant.address.city}</h4>
                                </div>
                            </div>
                        </div>
                        <div id="map-holder" className="col-5">
                            <Map restaurant={restaurant} />
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <h3>Booking Details</h3>
                                <hr />
                                <div className="row">
                                    <div className="col-9">
                                        <label>Select Date</label>
                                        <input id="date" onChange={(e) => { setBookingDate(e.target.value) }} type="date" min={new Date().toISOString().slice(0, 10)} value={bookingDate} className="form-control" />
                                    </div>
                                    <div className="col-3">
                                        <label>Guests</label>
                                        <input id="guestsNo" onChange={(e) => setGuestsNo(e.target.value)} type="number" defaultValue={1} min={1} max={20} className="form-control" />
                                    </div>
                                </div>



                                <label>Extra Info (*optional)</label>
                                <textarea ref={extra => extraInfo = extra} className="form-control" />
                                <h4 id="booking-amount">Booking Amount : &#8377; <span id="amount">{guestsNo * restaurant.avgCostPer2}</span> </h4>


                            </div>

                            <div className="col-6">
                                <h3 className="">Time Slots</h3>
                                <hr />
                                <div className="time-slot-container row">
                                    {calcTime(restaurant.openingTime + " AM", restaurant.closingTime + " PM").map((slot, index) => {
                                        return slot != bookingTime
                                            ?
                                            <div onClick={(obj) => selectTime(obj)} className="col-3 slot">
                                                {slot}
                                            </div>
                                            :
                                            <div onClick={(obj) => selectTime(obj)} className="col-3 active-slot">
                                                {slot}
                                            </div>
                                    })}
                                    {

                                    }
                                </div>
                            </div>

                        </div>
                        <div className="text-center">
                            <button onClick={() => bookMyTable(restaurant)} className="btn btn-danger myBtn m-4">Book my table</button>
                        </div>

                    </div>
                </div>
            </div>

            <hr />
            <div id="review-container" className="container m-auto mb-5">
                <div className="row">
                    <div className="col-8 ">
                        <h4>Reviews (0)</h4>
                        <div className="review">
                            <h3>Username</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odit facere, quae optio repudiandae unde recusandae voluptate, vitae illum quo omnis aliquam, sapiente deserunt iusto! Quibusdam incidunt in accusamus ea.
                            </p>
                        </div>
                    </div>
                    <div className="col-4 bg-danger">avava</div>
                </div>
            </div>

            <div>

            </div>
        </div>
    </>
}







