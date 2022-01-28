import React from 'react'
import propTypes from 'prop-types'

import './checkbox.css'

function Checkbox(props) {

    const handleChange = (e) => {
        props.callback(e.target.value)
    }


    return (
        <div className={props.checkboxStyleContainer}>

            <input checked={props.value} 
                onChange={handleChange} 
                type='checkbox' 
                className={props.checkboxStyleInput}
            >
            </input>
            <label className={props.checkboxStyleLabel}>{props.label}</label>
            
        </div>
    )
}

export default Checkbox

Checkbox.defaultProps = {
    label: 'checkbox label',
}

Checkbox.propTypes = {
    label: propTypes.string
}