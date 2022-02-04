import Modal from "../Modal";
import './NewTicketListModal.css'
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import workspacesApi from "../../../services/workspacesApi";
import { useTranslation } from "react-i18next";

const NewTicketListModal = (props) => {
	const params = useParams();
	const { t } = useTranslation();
	const [state, setState] = useState({
		ticketListTitle: null,
	});

	const takeinput = (e) => {
		let value = e.target.value;

		setState({
			...state,
			ticketListTitle: value,
		});
	};

	const addTicketList = () => {
		let newTicketList = {
			name: state.ticketListTitle,
			tickets: [],
		};

		let workspace = props.workspaces.find(
			(w) => w.name === params.workspaceName
		);

		const indexBoard = workspace.boards.findIndex(
			(b) => b.name === params.boardName
		);

		workspace.boards[indexBoard].ticketLists.push(newTicketList);

		// save update
		workspacesApi.update(workspace, props.userId, props.dispatch);

		props.onClickButton();
	};

	return (
		<Modal>
			<div className="NewTicketListModal-container">
				<div className="newTicketListModal-title">
					<label>{t("NewTicketListModal.NewTitle")}</label>
					<input type={"text"} onChange={takeinput} />
				</div>
				<div className="newTicketListModal-buttons">
					<SubmitButton
					onClick={addTicketList}
					className="newTicketListModal-btn"
					label={t("NewTicketListModal.BtnCreate")} />
					<SubmitButton
					label={t("NewTicketListModal.BtnCancel")}
					className="newTicketListModal-btn"
					onClick={props.onClickButton} />
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

NewTicketListModal.propTypes = {
	onClickButton: PropTypes.func,
};

NewTicketListModal.defaultProps = {
	onClickButton: () => undefined,
};
export default connect(mapStateToProps)(NewTicketListModal);
