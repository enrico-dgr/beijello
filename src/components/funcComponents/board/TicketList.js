import "./TicketList.css";
import PropTypes from "prop-types";
import React, { useState } from "react";

import NewTicketModal from "./NewTicketModal";
import SubmitButton from "../SubmitButton";
import Ticket from "./Ticket.js";
import RemoveTicketList from "./RemoveTicketList";

const TicketList = (props) => {
	const { ticketList } = props;
	const [modalFlag, setModalFlag] = useState(false);

	const renderTicket = (ticket, i) => {
		return (
			!!ticket.title && (
				<Ticket
					ticket={ticket}
					ticketListId={props.ticketList.id}
					key={ticket.title + i}
				/>
			)
		);
	};

	const openModal = () => {
		setModalFlag(true);
	};

	const closeModal = () => {
		setModalFlag(false);
	};

	return (
		<div className="ticketList-container">
			<div className="ticketList-title">
				<p>{ticketList.name}</p>
			</div>
			{/* List's buttons */}
			<div className="ticketList-btns">
				<SubmitButton
					className={"ticketList-new-ticket-btn"}
					label="+ Aggiungi ticket"
					onClick={openModal}
				/>
				<RemoveTicketList ticketListId={ticketList.id} />
			</div>
			{/* Tickes */}
			<div className="ticketList-tickets-container">
				{ticketList.tickets.map(renderTicket)}
			</div>
			{/* Modals */}
			{modalFlag && (
				<NewTicketModal
					onClickButton={closeModal}
					ticketListId={ticketList.id}
				/>
			)}
		</div>
	);
};

TicketList.propTypes = {
	ticketList: PropTypes.object.isRequired,
};

export default TicketList;
