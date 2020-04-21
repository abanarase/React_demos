import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

const DateP = ({startDate, label, minDate,maxDate,endDate, onChange}) => {
    
    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
    };

    return (
        
<div className="form-group col-md-6">
{label && <label htmlFor="app-input-field">{label}</label>}
<DatePicker
 className="form-control"
 maxDate={maxDate}
  minDate={minDate}
selectsStart 
selectsEnd
startDate={startDate} 
endDate={endDate}
selected={startDate} 
onChange={this.handleChange}/>
</div>

    )
};

DatePicker.propTypes = {
    onChange: PropTypes.func.isRequired
};



export default DateP;
