import React from "react";
import './TicketList.css';
import Ticket from './Ticket.js';


const TicketList = (props) => {
    const { ticketList } = props

    const renderTicket = (ticket, i) => {
        return <Ticket key={ticket.name} ticket={ticket} />
    }

    return (

        <>
            <div className="ticketList-container" >
                <div className="ticketList-title">
                    <p >{ticketList.name}</p>
                </div>
                <div>
                    {ticketList.tickets.map(renderTicket)}
                </div>
            </div>
        </>

    )


}

export default TicketList