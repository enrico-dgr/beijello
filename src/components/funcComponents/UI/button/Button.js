import './Button.css';
import React from 'react';

import PropTypes from 'prop-types';


function Button(props) {

    const handleClick = () => {
        if (props.onClick !== undefined)
            props.onClick()
    }

    return (
        <button
            className={`toAdd-btn  ${props.className}`}
            onClick={handleClick}
        >
            {props.label}
            {props.children}
        </button>
    )
}

Button.defaultProps = {
    speciaClass: '',
    label: '',
}

Button.propTypes = {
    speciaClass: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func
}

export default Button