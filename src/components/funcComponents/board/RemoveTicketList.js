import "./RemoveTicketList.css";

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

		workspace.boards[indexBoard].ticketLists = workspace.boards[
			indexBoard
		].ticketLists.filter((t) => t.id !== props.ticketListId);

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
				<FontAwesomeIcon
					icon={faTrash}
					style={{ cursor: "pointer" }}
				/>
			</span>
			{state.showModal && (
				<Modal className="tickeList-confirm-delete-modal">
					<p>Are you sure you want to delete this board?</p>
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
	ticketListId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(RemoveTicket);
