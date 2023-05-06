import { useDispatch } from 'react-redux'
import './css/BookingHistory.css'
import { cancelBooking } from '../redux-config/user-slice';
import WarningModal from './WarningModal';
import { useNavigate } from 'react-router-dom';

export default function BookingHistory({ bookings, heading }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const viewRestaurant = (rest)=>{
        navigate("/restaurant",{state:{rest}});
    }

    return <>
        <div className="">
            <h1 className="activity-title" id="">{heading}</h1>
            <div className="row" id="card-container">
                {bookings.map((booking, index) => {
                    return <div className="booking-card">
                        <WarningModal index={index} booking={booking}/>
                        <div className='row'>
                            <div className="col-4">
                                <img src={"http://localhost:3000/image/" + booking.restaurantId.images[0]} alt="" />
                            </div>
                            <div className='col-4'>
                                <h4 className='b-restaurantName'>{booking.restaurantId.name.substring(0, 16)}</h4>
                                <p className='booking-charges'> Booking Charges <span>&#8377; {booking.restaurantId.avgCostPer2}</span></p>
                                <div className='paid'>
                                    Paid &#8377; <span>{booking.bookingAmount}</span> for&nbsp;
                                    <span>{booking.totalGuests}</span> guests
                                </div>
                            </div>
                            <div className='col-4 row'>
                                <div className='col-6'>
                                    <label className='b-label' >Time</label>
                                    <label className='time'>{booking.time}</label>
                                </div>
                                <div className='col-6'>
                                    <label className='b-label'>Date</label>
                                    <label className='date'>{booking.date}</label>
                                </div>
                                <div className='col-6'>
                                    <p className='b-status'><div style={{backgroundColor:"green"}}></div>{booking.status}</p>
                                </div>
                                <div className='col-6'>
                                    {
                                        booking.status == "Pending" ? <a data-toggle="modal" href={"#myModal"+index}> <button  className='btn btn-outline-danger btn-sm' >Cancel</button></a> 
                                            : <button className='btn btn-success btn-sm' onClick={()=>viewRestaurant(booking.restaurantId)}>See now</button>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </>
}