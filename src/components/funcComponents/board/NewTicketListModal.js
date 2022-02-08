import "./NewTicketListModal.css";

import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { createTicketList } from "../../../services/workspaceApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NewTicketListModal = (props) => {
	const params = useParams();
	const { t } = useTranslation();
	const [state, setState] = useState({
		ticketListName: null,
	});

	const takeinput = (e) => {
		let value = e.target.value;

		setState({
			...state,
			ticketListName: value,
		});
	};

	const addTicketList = () => {
		const board = props.workspaces
			.find((w) => w.id === parseInt(params.workspaceId))
			?.boards?.find((b) => b.id === parseInt(params.boardId));

		createTicketList(
			{ name: state.ticketListName, board },
			props.userId,
			props.dispatch
		);

		props.onClickButton();
	};

	return (
		<Modal>
			<div className="NewTicketListModal-container">
				<div className="newTicketListModal-title">
					<label>{t("NewTicketListModal.NewTitle")}</label>
					<input
						placeholder={"title"}
						type={"text"}
						onChange={takeinput}
					/>
				</div>
				<div className="newTicketListModal-buttons">
					<SubmitButton
						label={t("NewTicketListModal.BtnCancel")}
						className="newTicketListModal-btn"
						onClick={props.onClickButton}
					/>
					<SubmitButton
						onClick={addTicketList}
						className="newTicketListModal-btn"
						label={t("NewTicketListModal.BtnCreate")}
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

NewTicketListModal.defaultProps = {
	onClickButton: () => undefined,
};

NewTicketListModal.propTypes = {
	onClickButton: PropTypes.func,
};

export default connect(mapStateToProps)(NewTicketListModal);
