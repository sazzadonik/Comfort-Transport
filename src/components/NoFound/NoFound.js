import React from 'react';
import noFoundImg from '../../Images/image-asset.jpeg';
import "./NoFound.css";

const NoFound = () => {
    return (
        <div className="NoFound">
            <h3>Looks Like You Got Lost...</h3>
            <img src={noFoundImg} alt="" />
        </div>
    );
};

export default NoFound;