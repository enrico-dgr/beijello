import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { setWorkspace } from "../../../redux/ducks/workspacesDuck";
import { updateWorkspace } from "../../../services/workspaceApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

const NewTicketListModal = (props) => {

	const params = useParams()

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

		// update storage
		updateWorkspace(workspace, params.workspaceName, props.email)
		// update redux
		props.dispatch(setWorkspace(workspace, params.workspaceName));

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
	email: state.userMeDuck.user.email,
});

NewTicketListModal.propTypes = {
	onClickButton: PropTypes.func,
};

NewTicketListModal.defaultProps = {
	onClickButton: () => undefined
};
export default connect(mapStateToProps)(NewTicketListModal);
