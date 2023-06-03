import ReactStars from "react-rating-stars-component";
import React from "react";

export default function ReactStarRating({setFlag}) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
        setFlag(false)
      };

    return <ReactStars
        count={5}
        onChange={ratingChanged}
        size={30}
        activeColor="#ffd700"
    />
}