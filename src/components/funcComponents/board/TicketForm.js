import "./TicketForm.css";

import React, { useEffect, useState } from "react";
import { createTicket, updateTicket } from "../../../services/workspaceApi";

import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TicketForm = (props) => {
	const params = useParams();

	const { t } = useTranslation();

	const [state, setState] = useState({
		ticket: props.ticket,
		lists: undefined,
		errorFlag: false,
	});

	useEffect(() => {
		setState((pS) => ({
			...pS,
			lists: props.workspaces
				// find workspace
				?.find((w) => w.id === parseInt(params.workspaceId))
				?.ticketLists // belonging to the board
				.filter((t) => t.boardId === parseInt(params.boardId))
				// map info
				.map((t) => ({
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

	const onChangeTicketList = (e) => {
		const toListId = parseInt(e.target.value);

		let workspace = props.workspaces.find(
			(w) => w.id === parseInt(params.workspaceId)
		);

		let ticket = workspace.tickets.find(
			(t) => t.id === state.ticket.id
		);

		ticket.ticketListId = toListId;

		updateTicket(ticket, props.userId, props.dispatch)
			.then(() =>
				setState({
					...state,
					ticket: {
						...state.ticket,
						ticketListId: toListId,
					},
				})
			)
			.catch(() => props.onClickCancel());
	};

	/** props callbacks handlers */
	const onClickCancel = (e) => {
		e.preventDefault();
		props.onClickCancel();
	};

	const areDataValid = () => state.ticket.title !== "";

	const onClickSave = (e) => {
		e.preventDefault();

		if (!areDataValid()) {
			// TODO: show errors to user

			setState({ ...state, errorFlag: true });
			return;
		}

		// get position
		let workspace = props.workspaces.find(
			(w) => w.id === parseInt(params.workspaceId)
		);

		if (!state.ticket.id) {
			// new ticket
			workspace.tickets.push(state.ticket);
			createTicket(
				{
					title: state.ticket.title,
					description: state.ticket.title,
					tag: state.ticket.tag,
					ticketList: props.ticketList,
				},
				props.userId,
				props.dispatch
			).then(() => props.onSave());
		} else {
			let workspace = props.workspaces.find(
				(w) => w.id === parseInt(params.workspaceId)
			);

			let ticket = {
				...workspace.tickets.find(
					(t) => t.id === state.ticket.id
				),
				...state.ticket,
			};

			updateTicket(ticket, props.userId, props.dispatch).then(() =>
				props.onSave()
			);
		}
	};

	return (
		<form className="ticket-form-container">
			<div className="ticket-form-field">
				<label>{t("TicketForm.Title")}</label>
				<input
					type="text"
					value={state.ticket.title}
					onChange={onChangeTitle}
					placeholder={
						state.errorFlag
							? t("TicketForm.MissingTitle")
							: t("TicketForm.InsertTitle")
					}
				/>
			</div>
			<div className="ticket-form-field">
				<label>{t("TicketForm.Description")}</label>
				<input
					type="text"
					onChange={onChangeDescription}
					value={state.ticket.description}
					placeholder={
						state.errorFlag
							? t("TicketForm.MissingDescription")
							: t("TicketForm.InsertDescription")
					}
				/>
			</div>

			<div className="ticket-form-field">
				<label>{t("TicketForm.ChooseTicketFlag")}</label>
				<select
					defaultValue={state.ticket.tag}
					onChange={onChangeTicketFlag}
				>
					<option value="">
						{t("TicketForm.ColorNone")}
					</option>
					<option value="green">
						{t("TicketForm.ColorGreen")}
					</option>
					<option value="blue">
						{t("TicketForm.ColorBlue")}
					</option>
					<option value="orange">
						{t("TicketForm.ColorOrange")}
					</option>
					<option value="red">
						{t("TicketForm.ColorRed")}
					</option>
				</select>
			</div>

			<div className="ticket-form-field">
				<label>{t("TicketForm.MoveToOtherList")}</label>
				{
					<select
						value={state.ticket.ticketListId}
						onChange={onChangeTicketList}
					>
						{!!state.lists &&
							state.lists.map(MapListOptions)}
					</select>
				}
			</div>

			<div className="ticket-form-btns">
				<SubmitButton
					label={t("TicketForm.BtnCancel")}
					onClick={onClickCancel}
					className="ticket-form-btn"
				/>
				<SubmitButton
					label={t("TicketForm.BtnCreate")}
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
	ticketList: PropTypes.object.isRequired,
};

TicketForm.defaultProps = {
	onClickCancel: () => undefined,
	onSave: () => undefined,
};

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
	userId: state.userMeDuck.user.id,
});

export default connect(mapStateToProps)(TicketForm);
