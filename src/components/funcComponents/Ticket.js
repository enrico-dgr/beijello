import React from "react";
import Button from "./UI/button/Button";
import './Ticket.css'
const Ticket = (props) => {
    const { ticket } = props

    const addTicket = () => {

    }
    return (
        <>
            <div className="ticketContainer" key={ticket.title} >
                <p >{ticket.title}</p>
                
                {/* <Button label='-' className={'ticket-btn-add-ticket'} onClick={addTicket}/> */}
            </div>
        </>
    )
}

export default Ticket;