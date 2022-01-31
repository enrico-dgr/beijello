import React from "react";
import './Ticket.css'
const Ticket = (props) => {
    const { ticket } = props
    return (
        <>
            <div className="ticketContainer" key={ticket.name} >
                <p >{ticket.name}</p>
                <p >{ticket.description}</p>
                {/* BUTTON COMPONENT TO DO */}
            </div>
        </>
    )
}

export default Ticket;