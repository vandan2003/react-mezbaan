import { useState } from "react";
import BookingPage from "./BookingPage";
import Map from "./Map";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import "./css/RestaurantPage.css"


export default function RestaurantPage() {
    var imgArray = ['main.jpg', 'main1.jpg', 'main3.jpg', 'main4.jpg'];
    var cuisines = ["South Indian", "Chinese", "Italian"]
    var facilites = ["Ac", "Card", "Parking"]
    const [bookingPageStatus,setBookingPageStatus] = useState(false);


    return <>

        <Navbar />
        <div id="search-bar">
            <SearchBar />
        </div>

        <div id="rest-img-container" className="row">
            <div className="col-7">
                <img id="mainImg" src="/mezban-images/main.jpg" alt="" />
            </div>
            <div className="col-5">
                <div className="row">
                    {imgArray.map((image) => {
                        return <div style={{ height: imgArray.length * 50 + 'px' }} className={"sideImgHolder col-" + (12 / imgArray.length * 2)}>
                            <img className="sideImg" src={"mezban-images/" + image} alt="Image" />
                        </div>
                    })}
                </div>
            </div>
            <div className="col-9">
                <h1 id="rest-name">Restaurant</h1>
            </div>
            <div className="col-2" id="options">
                <span><i class="fa-solid fa-list"></i></span>&nbsp;&nbsp;
                <span id="favourite"><i class="fa-sharp fa-regular fa-heart"></i></span>
            </div>
        </div>

        <div className="row container m-auto">
            <div className="col-7 p-4">
                <div id="sec1">
                    <h3>Description</h3>
                    <p id="description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. At eaque ex odit obcaecati laborum! Modi suscipit officiis accusantium recusandae? Fugiat.
                    </p>

                    <button onClick={()=>{setBookingPageStatus(true)}} className="btn btn-danger myBtn">Book my table</button>
                </div>
            </div>
            <div className="col-5 p-4">
                <div id="sec2">
                    <h3>Cuisines</h3>
                    <p>
                        {
                            cuisines.map((cuisine) => cuisine + " , ")
                        }
                    </p>
                    <h3>Facilities</h3>
                    <p>
                        {
                            facilites.map((facility) => facility + " , ")
                        }
                    </p>
                </div>
            </div>
        </div>

        <div className="row container m-auto mb-5">
            <div className="col-6 p-3">
                <div id="detailsBox">

                    <h4> <i class="fa fa-phone" aria-hidden="true"></i>+91 7987983889</h4>
                    <h4><i class="fa fa-envelope" aria-hidden="true"></i>
                        rst@gmail.com</h4>
                    <h4><i className="fas fa-map-marker-alt"></i>test nagar, Indore</h4>
                </div>
            </div>
            <div id="map-holder" className="col-6 pb-3">
                <Map />
            </div>
        </div>

        <hr />

        <div id="review-container" className="container m-auto mb-5">
            <h2 id="review-heading">Reviews</h2>
            <hr />
            <div id="review-box">
                <div className="p-3 m-3">
                    <h3>Username</h3>

                    <p className="review"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam ratione pariatur ipsa porro facere fuga illum ullam? Eum, quo id. Hic quas necessitatibus nisi mollitia quod incidunt suscipit labore omnis.</p>
                </div>

                <div className="p-3 m-3">
                    <h3>Username</h3>

                    <p className="review"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam ratione pariatur ipsa porro facere fuga illum ullam? Eum, quo id. Hic quas necessitatibus nisi mollitia quod incidunt suscipit labore omnis.</p>
                </div>
                <div className="p-3 m-3">
                    <h3>Username</h3>

                    <p className="review"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam ratione pariatur ipsa porro facere fuga illum ullam? Eum, quo id. Hic quas necessitatibus nisi mollitia quod incidunt suscipit labore omnis.</p>
                </div>
            </div>
        </div>

        <div>

        </div>
        {bookingPageStatus&&<BookingPage bookingPageStatus={bookingPageStatus} setBookingPageStatus={setBookingPageStatus} />}

    </>
}