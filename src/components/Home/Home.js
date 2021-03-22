import { Grid } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../FakeData/FakeData'
import Vehicle from '../Vehicle/Vehicle';
import "./Home.css"


const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(fakeData)
    }, []);

    return (
        <div className="HomeCards">
            <Grid container spacing={5}>
                {
                    vehicles.map(vehicle => <Vehicle vehicle={vehicle} key={vehicle.id}></Vehicle>)
                }
            </Grid>
        </div>
    );
};
export default Home;