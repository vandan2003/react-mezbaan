import { useDispatch, useSelector } from "react-redux"
import "./css/SmallCard.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addFavourite, removeFavourite } from "../redux-config/user-slice";
import api from "../WebApi/api";
import { toast } from "react-toastify";
export default function SmallCard({ rest, index }) {
    let user = useSelector(state=>state.user.currentUser);
    const  navigate = useNavigate();
    const dispatch = useDispatch();
    const addToFavourite = async () => {
        if (!user)
            navigate("/signin");
        else if(!user.favourites.some(fav=>fav.restaurantId._id==rest._id)) {
            let addedResponse = await axios.post(api.ADD_TO_FAVOURITE, { resId: rest._id, cusId: user._id })
            console.log("****")
           
            if (addedResponse.data.status) {
                toast.success("Added to favourites");
                dispatch(addFavourite(addedResponse.data.favourite));
                console.log("true");
                console.log(addedResponse);
            }
        }
        else{
            let removedResponse = await axios.post(api.REMOVE_FROM_FAVOURITES, { resId: rest._id, cusId: user._id })
            if (removedResponse.data.status) {
                toast.warning("Removed from favorites");
                dispatch(removeFavourite(rest._id));
                console.log("false");
                console.log(removedResponse);
            }
        }
    }

    const viewRestaurant = (rest)=>{
        navigate("/restaurant",{state:{rest}});
    }
    
    return <>
        <div className="col-sm-12 col-xs-12 col-lg-6">
            <div className="small-card m-3">
                <div className="row">
                    <div className="col-7">
                        <img src={"http://localhost:3000/image/" + rest.images[0]} alt="" />
                    </div>
                    <div className="col-5">
                        <h3 className="sm-restaurant-name">{rest.name}</h3>
                        <hr />
                        <div className="sm-details">
                            <span className="sm-rating">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                {rest.rating}
                            </span>
                            <span className="sm-fav">
                                {
                                    user?.favourites.some((fav) => fav.restaurantId._id == rest._id) ? <span style={{ color: "red" }} id="favourite" onClick={addToFavourite}>
                                        <abbr title="favourite"><i className="fa fa-heart"></i></abbr>
                                    </span>
                                        : <span id="favourite" onClick={addToFavourite}>
                                            <abbr title="favourite"><i className="fa-sharp fa-regular fa-heart"></i></abbr>
                                        </span>
                                }
                            </span>
                        </div>
                        <hr />
                        <center>
                            <span className="sm-price">&#8377; {rest.avgCostPer2}</span>&nbsp;&nbsp;
                            <button className="sm-btn" onClick={()=>viewRestaurant(rest)} >Book Now</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>

    </>
}