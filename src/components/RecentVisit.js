import Card from "./Card"
import SmallCard from "./SmallCard"
import "./css/RecentVisit.css"
export default function RecentVisit({ visits ,heading}) {
    return <>
        <div className="">
            <h1 className="activity-title" id="">{heading}</h1>
            <div className="row" id="card-container">
                {visits.map((visit, index) => {
                    return <SmallCard rest={visit.restaurantId} index={index} />
                })}
            </div>
        </div>
    </>
}