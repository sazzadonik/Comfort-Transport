import { PeopleAlt } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';
import "./SubmittedInfo.css";



const SubmittedInfo = (props) => {
    const { fromPlace, fromTo, date } = props.journeyInfo;
    const setSearchSubmit = props.searchSubmit;
    const { title, image, price, capacity } = props.vehicle;

    const history = useHistory();
    const handleClick = () => {
        history.push("/success")
    }
    return (
        <div className="submittedInfo">
            <div>
                <h4>From: {fromPlace}</h4>
                <h4>To: {fromTo}</h4>
                <h4>Date: {date}</h4>
            </div>
            <div className="vehicleInfo">

                <table>
                    <tr>
                        <td><span>{title}</span></td>
                        <td><img src={image} height='25px' alt="" /></td>
                        <td> <PeopleAlt /><span>{capacity} </span></td>
                        <td><span>{"$" + price}</span></td>
                    </tr>
                </table>
            </div>


            <button className="SearchAgain" onClick={() => { setSearchSubmit(false) }}>Search Again</button>
            <button className="SearchAgain2" onClick={handleClick}> Confirm </button>
        </div>
    );
}

export default SubmittedInfo;