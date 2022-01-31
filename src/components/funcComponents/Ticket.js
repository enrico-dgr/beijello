import React from "react";
import Button from "./UI/button/Button";
import './Ticket.css'
const Ticket = (props) => {
    const { ticket } = props

    const addTicket = () => {
        
    }
    return (
        <>
            <div className="ticketContainer" key={ticket.name} >
                <p >{ticket.name}</p>
                <p >{ticket.description}</p>
            </div>
                <Button label='+ Aggiungi scheda' className={'ticket-btn-add-ticket'} onClick={addTicket}/>
        </>
    )
}

export default Ticket;