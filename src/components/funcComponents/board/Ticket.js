import "./Ticket.css";
import PropTypes from "prop-types";
import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Button from "../UI/button/Button";
/* fontawesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveTicket from "./RemoveTicket";

const Ticket = (props) => {
	const { ticket } = props;

	const onClickEdit = () => props.onClickEdit(ticket);

	return (
		<div className="ticket-container">
			<div className={"ticket-content-preview"}>
				<div
					className={"ticket-flag"}
					style={{
						backgroundColor: ticket.tag,
					}}
				></div>
				<p className="ticket-title" onClick={onClickEdit}>
					{ticket.title}
				</p>
			</div>
			<div className={"ticket-btns"}>
				<RemoveTicket
					ticketId={props.ticket.id}
					ticketListId={props.ticketListId}
				/>
				<Button className={"ticketBtn"} onClick={onClickEdit}>
					<FontAwesomeIcon icon={faEdit} />
				</Button>
			</div>
		</div>
	);
};

Ticket.propTypes = {
	onClickEdit: PropTypes.func.isRequired,
	ticket: PropTypes.object.isRequired,
	ticketListId: PropTypes.number.isRequired,
};

export default Ticket;
