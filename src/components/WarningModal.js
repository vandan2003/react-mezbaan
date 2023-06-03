import { useDispatch } from "react-redux";
import { cancelBooking } from "../redux-config/user-slice";
import "./css/WarningModal.css"
export default function WarningModal({index,booking}) {

    const dispatch = useDispatch();
    const cancel = (bookingId)=>{
        dispatch(cancelBooking(bookingId));
    }

    return <>
        <div id={"myModal"+index} className="modal fade">
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header flex-column">
                        <div className="icon-box">
                            <i className="material-icons">&#xE5CD;</i>
                        </div>
                        <h4 className="modal-title w-100">Are you sure?</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>10% of booking amount will be cutted of from your return!!</p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Back</button>
                        <button type="button"  className="btn btn-danger" data-dismiss="modal" onClick={()=>cancel(booking._id)} >Continue</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}