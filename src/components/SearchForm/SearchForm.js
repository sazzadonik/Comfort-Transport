import React from 'react';
import { useForm } from "react-hook-form";
const SearchForm = (props) => {
    const setSearchSubmit = props.searchSubmit;
    const setJourneyInfo = props.journeyInfo
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const { placeFrom, placeTo, date } = data;
        const info = {};
        info.fromPlace = placeFrom;
        info.fromTo = placeTo;
        info.date = date;
        setJourneyInfo(info)
        setSearchSubmit(true);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="placeFrom">Pick From{errors.placeFrom && <span style={{ color: "red", float: "right" }}>Pick From is required</span>}</label>
            <input name="placeFrom" ref={register({ required: true })} placeholder="Pick From" />

            <label htmlFor="placeTo">Pick To  {errors.placeTo && <span style={{ color: "red", float: "right" }}>Pick To is required</span>}</label>
            <input name="placeTo" ref={register({ required: true })} placeholder="Pick To" />

            <label htmlFor="date">Date {errors.date && <span style={{ color: "red", float: "right" }}>Date is required</span>}</label>
            <input name="date" type="date" ref={register({ required: true })} />
            <input className="inputSubmit" type="submit" value="Search" />
        </form>
    );
};

export default SearchForm;