import "./RemoveTicket.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import workspacesApi from "../../../services/workspacesApi";
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

		let workspace = props.workspaces.find(
			(w) => w.id === parseInt(params.workspaceId)
		);

		const indexBoard = workspace.boards.findIndex(
			(b) => b.id === parseInt(params.boardId)
		);

		const ticketListIndex = workspace.boards[
			indexBoard
		].ticketLists.findIndex((t) => t.id === props.ticketListId);

		workspace.boards[indexBoard].ticketLists[ticketListIndex].tickets =
			workspace.boards[indexBoard].ticketLists[
				ticketListIndex
			].tickets.filter((t) => t.id !== props.ticketId);

		workspacesApi
			.update(workspace, props.userId, props.dispatch)
			.catch((err) =>
				toast.error(err.message, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			);

		hideModal();
	};

	return (
		<div className={props.classNameContainer}>
			<span onClick={showModal}>
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
	ticketListId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(RemoveTicket);
