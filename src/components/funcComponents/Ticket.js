import React,{useState} from "react";
import NewTicketModal from "../funcComponents/board/NewTicketModal";
import Button from "./UI/button/Button";
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
            <div className="ticketContainer" key={ticket.title} onClick={openModal}>
                {modalFlag && (
                    <NewTicketModal
                        onClickButton={closeModal}

                    />
                )}
                <p >{ticket.title}</p>
                <div style={{ backgroundColor: ticket.ticketFlag, height: 10, width: 100, borderRadius: 5 }}></div>
                <Button label='-' className={'ticketBtn-remove-ticket'} onClick={removeTicket} />
            </div>
        </>
    )
}

export default Ticket;