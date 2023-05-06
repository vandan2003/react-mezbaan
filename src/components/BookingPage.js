import { useRef } from "react";
import "./css/BookingPage.css"
export default function BookingPage({bookingPageStatus,setBookingPageStatus}) {
    let bookingPage = useRef();
    const closeBookingpage =()=>{
        bookingPage.style.transform = "translate(0px,-100vh)";
        
        setTimeout(() => {
            setBookingPageStatus(false)
        }, 1000);
    }
    return <>
        <div ref={bookPage=>bookingPage = bookPage} className="my-overlay">
            <div className="cross" onClick={closeBookingpage}><i className="fa fa-times" aria-hidden="true"></i>
            </div>
            <div id="booking-window" className="row">
                <div className="col-6">
                    <div id="date-and-time">
                        <h3>Date & Time</h3>
                        <hr/>
                        <input type="date" />
                        <div className="row mt-4">
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                            <div className="col-4 mt-2">
                                <button className="btn btn-danger">10:10 to 11:11</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div id="other-details">
                        <h3>Booking Details</h3>
                        <hr/>
                        <div className="row">
                            <label className="col-6">Total Guests : </label>
                            <div className="col-6" >
                                <input style={{width:"50px"}} type="number" />
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-12">Extra info</label>
                            <div className="col-12" >
                                <textarea cols="30" rows="4"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-6">Amount :</label>
                            <label className="col-6">2000</label>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-center mt-4">
                    <button className="btn btn-danger">Confirm Booking</button>
                </div>
            </div>
        </div>
    </>
}