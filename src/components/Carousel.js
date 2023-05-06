import { useLocation } from "react-router-dom"
import "./css/Carousel.css"
export default function Carousel({images,setFlag}) {
   
    const closePage = () => {
        document.getElementById("image-overlay").style.transform = "translate(0px,-100vh)";

        setTimeout(() => {
            setFlag(false)
        }, 1000);
    }
    return <>

       <div id="image-overlay" className="my-overlay">
       <div className="cross" onClick={closePage} ><i className="fa fa-times" aria-hidden="true"></i>
        </div>
       <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active ">
                    <img src={"http://localhost:3000/image/"+images[0]}/>
                </div>

                {images.map((image, index) => <div className="carousel-item"><img src={"http://localhost:3000/image/"+image} className="" width={"100%"} height={"550vw"} /> </div>)}

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span  className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
       </div>
    </>
}