import React from 'react'

import PropTypes from 'prop-types'

import './CircleButton.css'

function CircleButton(props) {
    
    return (
        
        <button 
            className={`circle-btn ${props.disable?'circle-btn--disabled':''} ${props.className}`} 
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

CircleButton.defaultProps = {
    className: '',
    disable: false,
    onClick: () => undefined,
}

CircleButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disable: PropTypes.bool,
    onClick: PropTypes.func
}

export default CircleButton