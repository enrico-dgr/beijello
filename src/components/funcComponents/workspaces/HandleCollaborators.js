import "./HandleCollaborators.css";

import React, { useCallback, useEffect } from "react";
import {
	createCollaborator,
	deleteCollaborator,
	getRelationsByWorkspaceId,
} from "../../../services/workspaceApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import usersApi from "../../../services/usersApi";

const HandleCollaborators = (props) => {
	const [state, setState] = React.useState({
		showModal: false,
		query: "",
		users: [],
		relations: [],
		refresh: 0,
	});

	useEffect(() => {
		getRelationsByWorkspaceId(props.workspaceId).then((relations) =>
			setState((pS) => ({ ...pS, relations }))
		);
	}, [state.showModal, state.refresh, props.workspaceId]);

	useEffect(() => {
		usersApi
			.getUsersByMatchingText(state.query)
			.then((users) => setState((pS) => ({ ...pS, users })))
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
	}, [state.query]);

	const filterUsers = useCallback(
		(user) =>
			state.relations.findIndex((r) => r.user.id === user.id) < 0,
		[state.relations]
	);

	const hideModal = () => {
		setState({ ...state, showModal: false });
	};

	const showModal = () => {
		setState({ ...state, showModal: true });
	};

	const onChange = (e) => {
		setState({ ...state, query: e.target.value });
	};

	const onClickAddUser = (userIdToAdd) => () => {
		createCollaborator(
			props.workspaceId,
			props.userId,
			userIdToAdd
		).then(() =>
			setState((pS) => ({ ...pS, refresh: pS.refresh + 1 }))
		);
	};

	const onClickRemove = (userIdToDelete) => () => {
		deleteCollaborator(
			props.workspaceId,
			props.userId,
			userIdToDelete
		).then(() =>
			setState((pS) => ({ ...pS, refresh: pS.refresh + 1 }))
		);
	};

	return (
		<div>
			<div className="workspace-collaborators">
				<FontAwesomeIcon icon={faUser} onClick={showModal} />
			</div>
			{state.showModal && (
				<Modal className="workspace-collaborators-modal">
					<p className="workspace-collaborators-modal__collabs">
						{props.workspaceName}'s collaborators:
					</p>
					<div className="workspace-collaborators-modal__users-list">
						{state.relations.map(
							MapRelations(onClickRemove)
						)}
					</div>
					<div className="workspace-collaborators-modal__query">
						<p>Add users to workspace</p>
						<input
							type="text"
							placeholder={"User"}
							value={state.query}
							onChange={onChange}
						/>
					</div>
					<div className="workspace-collaborators-modal__users-list">
						{state.users
							.filter(filterUsers)
							.map(MapUsers(onClickAddUser))}
					</div>
					<button onClick={hideModal}>Close</button>
				</Modal>
			)}
		</div>
	);
};

const MapUsers = (onClick) => (user, i) =>
	(
		<div
			key={"collabs-users" + i + user.fullName}
			className="workspace-collaborators-modal__user"
		>
			<div className="workspace-collaborators-modal__user-data">
				<p className="workspace-collaborators-modal__user__full-name">
					{user.fullName}
				</p>
				<p className="workspace-collaborators-modal__user__email">
					{user.email}
				</p>
			</div>
			<button onClick={onClick(user.id)}>Add</button>
		</div>
	);

const MapRelations =
	(onClick) =>
	({ user, role }, i) =>
		(
			<div
				key={"collabs-users" + i + user.fullName}
				className={`workspace-collaborators-modal__user ${
					"workspace-collaborators-modal__user--" + role
				}`}
			>
				<div className="workspace-collaborators-modal__user-data">
					<p className="workspace-collaborators-modal__user__full-name">
						{user.fullName}
					</p>
					<p className="workspace-collaborators-modal__user__email">
						{user.email}
					</p>
				</div>
				<button onClick={onClick(user.id)}>Remove</button>
			</div>
		);

HandleCollaborators.propTypes = {
	workspaceId: PropTypes.number.isRequired,
	workspaceName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	userId: state.userMeDuck.user.id,
});

export default connect(mapStateToProps)(HandleCollaborators);
