import "./NewTicketModal.css";

import React, { useState } from "react";

import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import workspacesApi from "../../../services/workspacesApi";

const NewTicketModal = (props) => {
	const params = useParams();

	const [state, setState] = useState({
		title: "",
		description: "",
		ticketFlag: "",
		errorFlag: false,
	});

	const getTitle = (e) => {
		let title = e.target.value;

		setState({ ...state, title: title });
	};
	const getDescription = (e) => {
		let description = e.target.value;

		setState({ ...state, description: description });
	};

	const handleTicketFlag = (e) => {
		let ticketFlag = e.target.value;
		setState({ ...state, ticketFlag: ticketFlag });
	};

	const handleMoveToOtherList = () => {};

	const saveComment = () => {
		let newTicket = {
			title: state.title,
			description: state.description,
			ticketFlag: state.ticketFlag,
			errorFlag: state.errorFlag,
		};

		let workspace = props.workspaces.find(
			(w) => w.id === parseInt(params.workspaceId)
		);

		const indexBoard = workspace.boards.findIndex(
			(b) => b.id === parseInt(params.boardId)
		);

		const indexTicketList = workspace.boards[
			indexBoard
		].ticketLists.findIndex((t) => t.id === props.ticketListId);

		const newId =
			workspace.boards[indexBoard].ticketLists[indexTicketList]
				.tickets.length === 0
				? 1
				: workspace.boards[indexBoard].ticketLists[
						indexTicketList
				  ].tickets[
						workspace.boards[indexBoard].ticketLists[
							indexTicketList
						].tickets.length - 1
				  ].id + 1;

		if (newTicket.title !== "") {
			// edit workspace
			workspace.boards[indexBoard].ticketLists[
				indexTicketList
			].tickets.push({ ...newTicket, id: newId });
			// save update
			workspacesApi.update(workspace, props.userId, props.dispatch);
			//close modal
			props.onClickButton();
		} else {
			newTicket.errorFlag = true;
			setState({ ...state, errorFlag: newTicket.errorFlag });
		}
	};
	return (
		<Modal>
			<div className="newTicketModal-container">
				<div className="newTicketModal-title">
					<label>Title</label>
					<input
						type="text"
						onChange={getTitle}
						placeholder={
							state.errorFlag
								? "title is missing"
								: "insert title"
						}
					/>
				</div>
				<div className="newTicketModal-description">
					<label>Description</label>
					<input
						type="text"
						onChange={getDescription}
						placeholder={
							state.errorFlag
								? "description is missing"
								: "insert description"
						}
					/>
				</div>

				<div className="newTicketModal-ticketFlag">
					<label>Choose ticket flag</label>
					<select onChange={handleTicketFlag}>
						<option value=""></option>
						<option value="red">red</option>
						<option value="green">green</option>
						<option value="orange">orange</option>
						<option value="blue">blue</option>
					</select>
				</div>

				<div className="newTicketModal-moveToOtherList">
					<label>Move to other list </label>
					<select onChange={handleMoveToOtherList}>
						<option value=""></option>
					</select>
				</div>

				<div className="newTicketModal-buttons">
					<SubmitButton
						label="Save"
						onClick={saveComment}
						className="newTicketModal-btn"
					/>
					<SubmitButton
						label="Cancel"
						onClick={props.onClickButton}
						className="newTicketModal-btn"
					/>
				</div>
			</div>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
	userId: state.userMeDuck.user?.id,
});

NewTicketModal.propTypes = {
	onClickButton: PropTypes.func,
	ticketListId: PropTypes.number.isRequired,
};

NewTicketModal.defaultProps = {
	onClickButton: () => undefined,
};

export default connect(mapStateToProps)(NewTicketModal);
