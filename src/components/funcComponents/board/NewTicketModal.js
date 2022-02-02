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
		ticketFlag: "red",
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

	const saveComment = () => {
		let newTicket = {
			title: state.title,
			description: state.description,
			ticketFlag: state.ticketFlag,
			errorFlag: state.errorFlag,
		};

		let workspace = props.workspaces.find(
			(w) => w.name === params.workspaceName
		);

		const indexBoard = workspace.boards.findIndex(
			(b) => b.name === params.boardName
		);

		const indexTicketList = workspace.boards[
			indexBoard
		].ticketLists.findIndex((t) => t.name === props.ticketList.name);

		if (newTicket.title !== "") {
			// edit workspace
			workspace.boards[indexBoard].ticketLists[
				indexTicketList
			].tickets.push(newTicket);
			// save update
			workspacesApi.update(workspace, props.userId, props.dispatch);
			//close modal
			props.onClickButton();
		} else {
			newTicket.errorFlag = true;
			setState({ ...state, errorFlag: newTicket.errorFlag });
		}

		console.log(state, newTicket);
	};
	return (
		<Modal>
			<div className="newTicketModal-container">
				<div className="newTicketModal-title">
					<label>Titolo</label>
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
					<label>Descrizione</label>
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
					<label>
						Scegli etichetta
						<select onChange={handleTicketFlag}>
							<option value="red">rosso</option>
							<option value="green">verde</option>
							<option value="orange">arancione</option>
							<option value="blue">blu</option>
						</select>
					</label>
				</div>

				<div className="newTicketModal-buttons">
					<SubmitButton
						label="Salva"
						onClick={saveComment}
						className="newTicketModal-btn"
					/>
					<SubmitButton
						label="Annulla"
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
	email: state.userMeDuck.user?.email,
	userId: state.userMeDuck.user?.id,
});

NewTicketModal.propTypes = {
	onClickButton: PropTypes.func,
};

NewTicketModal.defaultProps = {
	onClickButton: () => undefined,
};

export default connect(mapStateToProps)(NewTicketModal);
