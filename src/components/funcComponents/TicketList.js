import React, {useState} from "react";
import './TicketList.css';
import Ticket from './Ticket.js';
import NewTicketModal from '../funcComponents/board/NewTicketModal'
import SubmitButton from "../funcComponents/SubmitButton";


const TicketList = (props) => {
    const { ticketList } = props
    const [modalFlag, setModalFlag] = useState(false);
    const renderTicket = (ticket, i) => {
        return <Ticket key={ticket.name} ticket={ticket} />
    }

    const openModal = () => {
		setModalFlag(true);
	};

    const closeModal = () => {
		setModalFlag(false);
	};

    return (

        <>
            <div className="ticketList-container" >
                <div className="ticketList-title">
                    <p >{ticketList.name}</p>
                </div>
                <div>
                    {ticketList.tickets.map(renderTicket)}
                    <SubmitButton label="+ Aggiungi ticket" onClick={openModal}  />
                    {modalFlag && <NewTicketModal />}
                </div>
            </div>
        </>

    )

}
// const mapStateToProps = (state) => ({
// 	workspaces: state.workspacesDuck.workspaces,
// });
export default TicketList