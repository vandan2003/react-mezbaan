import { useLocation, useNavigate } from "react-router-dom"
import "./css/Card.css"
export default function Card({ rest, index }) {
    const navigate = useNavigate();

    const viewRestaurant = (rest) => {
        navigate("/restaurant", { state: { rest } });
    }


    return <>
        <div className="col-lg-4">
            <div className="restaurant-card">
                <div className="image-holder">
                    <img src={"http://localhost:3000/image/" + rest.images[0]} />
                </div>
                <div className="row">
                    <h3 className="col-9 card-heading">{rest.name.substring(0, 15)}</h3>
                    <div className="col-3">
                        <p className="card-rating">{rest.rating}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11">
                        <p className="desc-restcard">
                            {rest.description}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <p className=" col-9">
                        <span className="card-price">
                            &#8377; {rest.avgCostPer2}
                        </span>
                    </p>
                    <abbr title="view more" className="col-3 view-eye">
                        <span onClick={() => viewRestaurant(rest)}><i className="fa fa-eye" aria-hidden="true"></i></span>
                    </abbr>
                </div>
            </div>
        </div>
    </>
}