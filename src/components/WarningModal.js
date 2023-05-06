import { useDispatch } from "react-redux";
import { cancelBooking } from "../redux-config/user-slice";
import "./css/WarningModal.css"
export default function WarningModal({index,booking}) {

    const dispatch = useDispatch();
    const cancel = (bookingId)=>{
        dispatch(cancelBooking(bookingId));
    }

    return <>
        <div id={"myModal"+index} class="modal fade">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <div class="icon-box">
                            <i class="material-icons">&#xE5CD;</i>
                        </div>
                        <h4 class="modal-title w-100">Are you sure?</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>10% of booking amount will be cutted of from your return!!</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Back</button>
                        <button type="button"  class="btn btn-danger" data-dismiss="modal" onClick={()=>cancel(booking._id)} >Continue</button>
                    </div>
                </div>
            </div>
        </div>

    </>
}