
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fakeData from "../../FakeData/FakeData"
import SearchForm from '../SearchForm/SearchForm';
import SubmittedInfo from '../SubmittedInfo/SubmittedInfo';
import "./Transport.css"

const Transport = () => {
    const { id } = useParams();
    const [vehicles, setVehicle] = useState([]);
    const [journeyInfo, setJourneyInfo] = useState({});
    const [searchSubmit, setSearchSubmit] = useState(false)

    useEffect(() => setVehicle(fakeData), []);
    const vehicle = vehicles.find((data) => +data.id === +id);
    return (
        <div className="containerMap">
            <div className="dashBoard">

                {!searchSubmit &&

                    <SearchForm journeyInfo={setJourneyInfo} searchSubmit={setSearchSubmit} />
                }
                {searchSubmit &&
                    <SubmittedInfo journeyInfo={journeyInfo} searchSubmit={setSearchSubmit} vehicle={vehicle} />
                }
            </div >

            <div className="googleMap">
                <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7300.79456329178!2d90.3648420734366!3d23.804467888250784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d0c51998f7%3A0x2251b181b13105e4!2sSenpara%20Parbata%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1616248506520!5m2!1sen!2sbd" width="100%" height="100%" allowfullscreen="" loading="lazy"></iframe>
            </div>




        </div>

    );
};

export default Transport;