import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import workspacesApi from "../../../services/workspacesApi";

const NewTicketListModal = (props) => {
	const params = useParams();

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
			<label>Inserisci titolo lista</label>
			<input type={"text"} onChange={takeinput} />

			<SubmitButton label="Annulla" onClick={props.onClickButton} />
			<SubmitButton onClick={addTicketList} label="Crea" />
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
