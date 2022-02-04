import "./HandleCollaborators.css";

import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import usersApi from "../../../services/usersApi";
import workspacesApi from "../../../services/workspacesApi";

const HandleCollaborators = (props) => {
	const [state, setState] = React.useState({
		showModal: false,
		query: "",
		users: [],
		relations: [],
		refresh: 0,
	});

	useEffect(() => {
		workspacesApi
			.getRelations(props.workspaceId)
			.then((relations) => setState((pS) => ({ ...pS, relations })))
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
	}, [state.showModal, state.refresh]);

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

	const hideModal = () => {
		setState({ ...state, showModal: false });
	};

	const showModal = () => {
		setState({ ...state, showModal: true });
	};

	const onChange = (e) => {
		setState({ ...state, query: e.target.value });
	};

	const onClickAddUser = (userId) => () => {
		workspacesApi
			.addCollaborator(props.workspaceId, userId)
			.then(() =>
				setState((pS) => ({ ...pS, refresh: pS.refresh + 1 }))
			)
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
	};

	const onClickRemove = (userId) => () => {
		workspacesApi
			.deleteCollaborator(props.workspaceId, userId)
			.then(() =>
				setState((pS) => ({ ...pS, refresh: pS.refresh + 1 }))
			)
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
						{state.users.map(MapUsers(onClickAddUser))}
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

export default connect()(HandleCollaborators);
