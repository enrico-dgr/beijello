import React, { useState } from "react";
import NewTicketModal from "../funcComponents/board/NewTicketModal";
import Button from "./UI/button/Button";
/* fontawesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import './Ticket.css';

const Ticket = (props) => {
    const { ticket } = props
    const [modalFlag, setModalFlag] = useState(false);
    const removeTicket = () => {

    }

    const openModal = () => {
        setModalFlag(true);
    };

    const closeModal = () => {
        setModalFlag(false);
    };
    return (
        <>
            <div className="ticketContainer" key={ticket.title}>
                {modalFlag && (
                    <NewTicketModal
                        onClickButton={closeModal}
                    />
                )}
                <p >{ticket.title}</p>
                <div style={{ backgroundColor: ticket.ticketFlag, height: 10, width: 100, borderRadius: 5 }}></div>

                <Button className={'ticketBtn'} onClick={removeTicket}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button className={'ticketBtn'} onClick={openModal}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
        </>
    )
}

export default Ticket;