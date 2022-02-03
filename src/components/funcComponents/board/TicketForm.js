import "./TicketForm.css";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

/**
 * - `onClickSave` property takes the edited ticket as parameter
 */
const TicketForm = (props) => {
	const params = useParams();

	const [state, setState] = useState({
		ticket: props.ticket,
		lists: undefined,
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

	const onChangeTitle = (e) => {
		let title = e.target.value;

		setState({ ...state, ticket: { ...state.ticket, title: title } });
	};
	const onChangeDescription = (e) => {
		let description = e.target.value;

		setState({
			...state,
			ticket: { ...state.ticket, description: description },
		});
	};

	const onChangeTicketFlag = (e) => {
		let ticketFlag = e.target.value;
		setState({
			...state,
			ticket: { ...state.ticket, ticketFlag: ticketFlag },
		});
	};

	const onChangeTicketList = () => {};

	const onClickCancel = (e) => {
		e.preventDefault();
		props.onClickCancel();
	};

	const onClickSave = (e) => {
		e.preventDefault();
		props.onClickSave(state.ticket);
	};

	return (
		<form className="ticket-form-container">
			<div className="ticket-form-field">
				<label>Title</label>
				<input
					type="text"
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
					placeholder={
						state.errorFlag
							? "description is missing"
							: "insert description"
					}
				/>
			</div>

			<div className="ticket-form-field">
				<label>Choose ticket flag</label>
				<select onChange={onChangeTicketFlag}>
					<option value=""></option>
					<option value="red">red</option>
					<option value="green">green</option>
					<option value="orange">orange</option>
					<option value="blue">blue</option>
				</select>
			</div>

			<div className="ticket-form-field">
				<label>Move to other list </label>
				{
					<select
						defaultValue={props.ticketListId}
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
	onClickSave: PropTypes.func,
	ticket: PropTypes.object,
	ticketListId: PropTypes.number.isRequired,
};

TicketForm.defaultProps = {
	onClickCancel: () => undefined,
	onClickSave: () => undefined,
	ticket: {
		title: "",
		description: "",
		ticketFlag: "",
	},
};

export default connect(mapStateToProps)(TicketForm);
