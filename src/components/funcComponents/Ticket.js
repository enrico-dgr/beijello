import React from "react";
import './Ticket.css'
const Ticket = (props) => {
    const { ticket } = props
    return (
        <>
            <div className="ticketContainer" key={ticket.name} >
                <p style={{ textAlign: 'left' }}>{ticket.name}</p>
                <p style={{ textAlign: 'left' }}>{ticket.description}</p>
                {/* BUTTON COMPONENT TO DO */}
            </div>
        </>
    )
}

export default Ticket;