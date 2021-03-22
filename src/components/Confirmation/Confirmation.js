import React from 'react';
import successImage from "../../Images/unnamed.gif"
import './Confirmation.css'



const Confirmation = () => {

    return (
        <div className="successDiv">
            <img className="successImage" src={successImage} alt="" srcset="" />
            <h1>Thank You!</h1>
            <p>Your Booking is Confirmed...</p>
        </div>
    );
};

export default Confirmation;