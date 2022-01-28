import React from 'react'
import "./Spinner.css"

export const Spinner = () => {
    return (
        <div className='spinner-container'>
            <div className='wrap'>
            <div className="lds-facebook center"><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}
