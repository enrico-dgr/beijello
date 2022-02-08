import "./TicketList.css";

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import RemoveTicketList from "./RemoveTicketList";
import SubmitButton from "../SubmitButton";
import Ticket from "./Ticket.js";
import TicketForm from "./TicketForm";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const TicketList = (props) => {
	const { ticketList } = props;
	const [state, setState] = useState({
		showTicketForm: false,
		ticketToEdit: {},
	});
	const { t } = useTranslation();
	const closeModal = () => {
		setState({
			...state,
			showTicketForm: false,
		});
	};

	const onClickEdit = (ticket) => {
		setState({ ...state, showTicketForm: true, ticketToEdit: ticket });
	};

	const onClickAdd = () => {
		setState({
			...state,
			showTicketForm: true,
			ticketToEdit: {
				title: "",
				description: "",
				tag: "",
			},
		});
	};

	return (
		<div className="ticketList-container">
			{/* Header */}
			<header className="ticketList-header">
				<div className="ticketList-header-left">
					<p>{ticketList.name}</p>
					<SubmitButton
						className={"ticketList-new-ticket-btn"}
						label={
							<>
								<FontAwesomeIcon
									icon={faPlus}
								/>{" "}
								{t("TicketList.AddTicket")}
							</>
						}
						onClick={onClickAdd}
					/>
				</div>
				<div>
					<RemoveTicketList ticketListId={ticketList.id} />
				</div>
			</header>
			{/* Tickes */}
			<div className="ticketList-tickets-container">
				{props.workspaces
					.find(
						(w) => w.id === props.ticketList.workspaceId
					)
					?.tickets.map(
						RenderTicket(
							onClickEdit,
							props.ticketList.id
						)
					)}
			</div>
			{/* Modals */}
			{state.showTicketForm && (
				<Modal>
					<TicketForm
						ticket={state.ticketToEdit}
						ticketList={ticketList}
						onClickCancel={closeModal}
						onSave={closeModal}
					/>
				</Modal>
			)}
		</div>
	);
};

const RenderTicket = (onClickEdit, ticketListId) => (ticket, i) => {
	return (
		!!ticket.title &&
		ticketListId === ticket.ticketListId && (
			<Ticket
				key={ticket.title + i}
				onClickEdit={onClickEdit}
				ticket={ticket}
			/>
		)
	);
};

TicketList.propTypes = {
	ticketList: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

export default connect(mapStateToProps)(TicketList);
