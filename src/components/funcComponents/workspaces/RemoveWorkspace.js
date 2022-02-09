import "./RemoveWorkspace.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { deleteWorkspaceById } from "../../../services/workspaceApi";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveWorkspace = (props) => {
	const [state, setState] = React.useState({
		showModal: false,
	});

	const hideModal = () => {
		setState({ ...state, showModal: false });
	};

	const showModal = () => {
		setState({ ...state, showModal: true });
	};

	const deleteWorkspace = () => {
		deleteWorkspaceById(
			props.workspaceId,
			props.userId,
			props.dispatch
		);
	};

	return (
		<div>
			<div className="workspace-delete">
				<FontAwesomeIcon icon={faTrash} onClick={showModal} />
			</div>
			{state.showModal && (
				<Modal className="workspace-confirm-delete-modal">
					<p>
						Are you sure you want to delete this
						workspace?
					</p>
					<p>This action will be irreversible.</p>
					<div>
						<button onClick={hideModal}>No</button>
						<button onClick={deleteWorkspace}>
							Yes
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

RemoveWorkspace.propTypes = {
	workspaceId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
	userId: state.userMeDuck.user?.id,
});

export default connect(mapStateToProps)(RemoveWorkspace);
