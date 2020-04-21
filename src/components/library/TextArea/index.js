import React, {useState} from 'react';
import PropTypes from 'prop-types';


const TextArea = ({value, label, placeholder,readonly,type, onChange}) => {
    
    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
    };

    return (
        <div className="form-group col-12" style={{padding:"10px"}}>
            {label && <label htmlFor="app-input-field">{label}</label>}
            <textarea
                    rows="3"
                    type={type}
                    value={value}
                    readOnly={readonly}
                    className='form-control'
                    placeholder={placeholder}
                    onChange={handleChange}
                />            
            
        </div>
    )
};

TextArea.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

TextArea.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  type: ''
};

export default TextArea;
