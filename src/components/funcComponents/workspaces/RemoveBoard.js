import "./RemoveBoard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteBoardById } from "../../../services/workspaceApi";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
	userId: state.userMeDuck.user.id,
});

const RemoveBoard = (props) => {
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

	const deleteBoard = (e) => {
		e.stopPropagation();

		const board = props.workspaces
			.find((w) => w.id === props.workspaceId)
			.boards.find((b) => b.id === props.boardId);

		deleteBoardById(board, props.userId, props.dispatch).then(() =>
			hideModal()
		);
	};

	return (
		<div className={props.classNameContainer}>
			<span onClick={showModal} style={{ cursor: "pointer" }}>
				<FontAwesomeIcon icon={faTrash} size="lg" />
			</span>
			{state.showModal && (
				<Modal className="board-confirm-delete-modal">
					<p>Are you sure you want to delete this board?</p>
					<p>This action will be irreversible.</p>
					<div>
						<button onClick={hideModal}>No</button>
						<button onClick={deleteBoard}>Yes</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

RemoveBoard.defaultProps = {
	classNameContainer: "",
};

RemoveBoard.propTypes = {
	boardId: PropTypes.number.isRequired,
	classNameContainer: PropTypes.string,
	workspaceId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(RemoveBoard);
