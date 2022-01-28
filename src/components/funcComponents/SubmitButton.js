import React from 'react'

import PropTypes from 'prop-types'

import './SubmitButton.css'

function FormButton(props) {
    
    const handleClick = () => {
        props.onClick()
    }

    return (
        <button 
            className={`login-btn ${props.disable?'login-btn--disabled':''} ${props.className}`} 
            onClick={handleClick}
        >
            {props.label}
        </button>
    )
}

FormButton.defaultProps = {
    className: '',
    disable: false,
    label: '',
    onClick: () => undefined,
}

FormButton.propTypes = {
    className: PropTypes.string,
    disable: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
}

export default FormButton
