import "./Ticket.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Button from "../UI/button/Button";
/* fontawesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveTicket from "./RemoveTicket";
import Modal from "../Modal";
import TicketForm from "./TicketForm";

const Ticket = (props) => {
	const { ticket } = props;
	const [modalFlag, setModalFlag] = useState(false);

	const openModal = () => {
		setModalFlag(true);
	};

	const closeModal = () => {
		setModalFlag(false);
	};
	return (
		<div className="ticketContainer">
			{modalFlag && (
				<Modal>
					<TicketForm
						ticketListId={props.ticketListId}
						onClickCancel={closeModal}
						onClickSave={closeModal}
					/>
				</Modal>
			)}

			<div className={"ticket-content-preview"}>
				<div
					className={"ticket-flag"}
					style={{
						backgroundColor: ticket.ticketFlag,
					}}
				></div>
				<p className="ticket-title">{ticket.title}</p>
			</div>
			<div className={"ticket-btns"}>
				<RemoveTicket
					ticketId={props.ticket.id}
					ticketListId={props.ticketListId}
				/>
				<Button className={"ticketBtn"} onClick={openModal}>
					<FontAwesomeIcon icon={faEdit} />
				</Button>
			</div>
		</div>
	);
};

Ticket.propTypes = {
	ticket: PropTypes.object.isRequired,
	ticketListId: PropTypes.number.isRequired,
};

export default Ticket;
