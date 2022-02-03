import "./TicketForm.css";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import workspacesApi from "../../../services/workspacesApi";
import { toast } from "react-toastify";

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
	userId: state.userMeDuck.user.id,
});

const TicketForm = (props) => {
	const params = useParams();

	const [state, setState] = useState({
		ticket: props.ticket,
		lists: undefined,
		listId: props.ticketListId,
	});

	useEffect(() => {
		setState((pS) => ({
			...pS,
			lists: props.workspaces
				// find workspace
				.find((w) => w.id === parseInt(params.workspaceId))
				// find board
				?.boards.find((b) => b.id === parseInt(params.boardId))
				// map info
				?.ticketLists.map((t) => ({
					name: t.name,
					id: t.id,
				})),
		}));
	}, [props.workspaces, params]);

	/** state handlers */
	const onChangeTitle = (e) => {
		let title = e.target.value;

		setState({ ...state, ticket: { ...state.ticket, title } });
	};
	const onChangeDescription = (e) => {
		let description = e.target.value;

		setState({
			...state,
			ticket: { ...state.ticket, description },
		});
	};

	const onChangeTicketFlag = (e) => {
		let tag = e.target.value;
		setState({
			...state,
			ticket: { ...state.ticket, tag },
		});
	};

	const onChangeTicketList = () => {};

	/** props callbacks handlers */
	const onClickCancel = (e) => {
		e.preventDefault();
		props.onClickCancel();
	};

	const areDataValid = () => state.ticket.title !== "";

	const getNewId = (workspace, indexBoard, indexTicketList) =>
		workspace.boards[indexBoard].ticketLists[indexTicketList].tickets
			.length === 0
			? // if no ticket exists in list
			  1
			: // add with greatest id
			  workspace.boards[indexBoard].ticketLists[indexTicketList]
					.tickets[
					workspace.boards[indexBoard].ticketLists[
						indexTicketList
					].tickets.length - 1
			  ].id + 1;

	const onClickSave = (e) => {
		e.preventDefault();

		if (!areDataValid()) {
			// TODO: show errors to user
			return;
		}

		// get position
		let workspace = props.workspaces.find(
			(w) => w.id === parseInt(params.workspaceId)
		);

		const indexBoard = workspace.boards.findIndex(
			(b) => b.id === parseInt(params.boardId)
		);

		const indexTicketList = workspace.boards[
			indexBoard
		].ticketLists.findIndex((t) => t.id === props.ticketListId);

		if (!state.ticket.id) {
			// new ticket
			workspace.boards[indexBoard].ticketLists[
				indexTicketList
			].tickets.push({
				...state.ticket,
				id: getNewId(workspace, indexBoard, indexTicketList),
			});
		} else {
			// edit existing ticket
			workspace.boards[indexBoard].ticketLists[
				indexTicketList
			].tickets = workspace.boards[indexBoard].ticketLists[
				indexTicketList
			].tickets.map((t) => {
				if (t.id === state.ticket.id) {
					return state.ticket;
				}
				return t;
			});
		}

		workspacesApi
			.update(workspace, props.userId, props.dispatch)
			.then(() => props.onSave())
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
		<form className="ticket-form-container">
			<div className="ticket-form-field">
				<label>Title</label>
				<input
					type="text"
					value={state.ticket.title}
					onChange={onChangeTitle}
					placeholder={
						state.errorFlag
							? "title is missing"
							: "insert title"
					}
				/>
			</div>
			<div className="ticket-form-field">
				<label>Description</label>
				<input
					type="text"
					onChange={onChangeDescription}
					value={state.ticket.description}
					placeholder={
						state.errorFlag
							? "description is missing"
							: "insert description"
					}
				/>
			</div>

			<div className="ticket-form-field">
				<label>Choose ticket flag</label>
				<select
					defaultValue={state.ticket.tag}
					onChange={onChangeTicketFlag}
				>
					<option value=""></option>
					<option value="green">green</option>
					<option value="blue">blue</option>
					<option value="orange">orange</option>
					<option value="red">red</option>
				</select>
			</div>

			<div className="ticket-form-field">
				<label>Move to other list </label>
				{
					<select
						defaultValue={state.listId}
						onChange={onChangeTicketList}
					>
						{!!state.lists &&
							state.lists.map(MapListOptions)}
					</select>
				}
			</div>

			<div className="ticket-form-btns">
				<SubmitButton
					label="Cancel"
					onClick={onClickCancel}
					className="ticket-form-btn"
				/>
				<SubmitButton
					label="Save"
					onClick={onClickSave}
					className="ticket-form-btn"
				/>
			</div>
		</form>
	);
};

const MapListOptions = (list, i) => (
	<option key={list.name + list.id + i + "options-lists"} value={list.id}>
		{list.name}
	</option>
);

TicketForm.propTypes = {
	onClickCancel: PropTypes.func,
	onSave: PropTypes.func,
	ticket: PropTypes.object.isRequired,
	ticketListId: PropTypes.number.isRequired,
};

TicketForm.defaultProps = {
	onClickCancel: () => undefined,
	onSave: () => undefined,
};

export default connect(mapStateToProps)(TicketForm);
