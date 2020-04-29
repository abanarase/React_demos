import React from 'react';
import PropTypes from 'prop-types';


const InputField = ({value, label, placeholder,readonly,type, onChange}) => {
    
    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
    };

    return (
        <div className="form-group col-6" style={{padding:"10px"}}>
            {label && <label htmlFor="app-input-field">{label}</label>}
            <input
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

InputField.propTypes = {
    //value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,    
    onChange: PropTypes.func.isRequired
};

InputField.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  type: ''
};

export default InputField;
