import "./RemoveTicket.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteTicketById } from "../../../services/workspaceApi";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
	userId: state.userMeDuck.user.id,
});

const RemoveTicket = (props) => {
	const params = useParams();
	const [state, setState] = React.useState({
		showModal: false,
	});

	const hideModal = () => {
		setState({ ...state, showModal: false });
	};

	const showModal = (e) => {
		e.stopPropagation();

		setState({ ...state, showModal: true });
	};

	const deleteTicket = (e) => {
		e.stopPropagation();

		const ticket = props.workspaces
			.find((w) => w.id === parseInt(params.workspaceId))
			.tickets.find((t) => t.id === props.ticketId);

		deleteTicketById(ticket, props.userId, props.dispatch).then(() =>
			hideModal()
		);
	};

	return (
		<div className={props.classNameContainer}>
			<span onClick={showModal} style={{ cursor: "pointer" }}>
				<FontAwesomeIcon icon={faTrash} />
			</span>
			{state.showModal && (
				<Modal className="board-confirm-delete-modal">
					<p>
						Are you sure you want to delete this ticket?
					</p>
					<p>This action will be irreversible.</p>
					<div>
						<button onClick={hideModal}>No</button>
						<button onClick={deleteTicket}>Yes</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

RemoveTicket.defaultProps = {
	classNameContainer: "",
};

RemoveTicket.propTypes = {
	classNameContainer: PropTypes.string,
	ticketId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(RemoveTicket);
