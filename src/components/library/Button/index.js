import React from 'react';
import PropTypes from 'prop-types';

import './buttonStyles.css';

const Button = ({value, onClick,className}) => (
    <button
        className={className}
        onClick={(event) => onClick(event)}>
        {value}
    </button>
);

Button.propTypes = {
    styleClass: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    styleClass: 'btn-primary'
};

export default Button;
