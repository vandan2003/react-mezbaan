const BACKEND_URL = "http://localhost:3000";
export default {
    AT_YOUR_CITY:BACKEND_URL+"/restaurant/at-your-city",
    SEARCH_RESTAURANTS:BACKEND_URL+"/restaurant/search",
    USER_SIGN_IN : BACKEND_URL+"/customer/signin",
    ADD_TO_FAVOURITE:BACKEND_URL+"/customer/add-to-favourite",
    REMOVE_FROM_FAVOURITES: BACKEND_URL+"/customer/remove-favourite",
    SAVE_BOOKING:BACKEND_URL+"/booking/save",
    GOOGLE_SIGNIN:BACKEND_URL+"/customer/google-signin",
    USER_SIGN_UP:BACKEND_URL+"/customer/signup",
    TOP_RATED_FOUR:BACKEND_URL+"/restaurant/top-rated-four",
    ADD_VISIT:BACKEND_URL+"/visit/add",
    GET_USER_VISITS:BACKEND_URL+"/visit/get-by-user",
    GET_USER_BOOKINGS:BACKEND_URL+"/booking/history",
    CANCEL_BOOKING:BACKEND_URL+"/booking/cancel"
}