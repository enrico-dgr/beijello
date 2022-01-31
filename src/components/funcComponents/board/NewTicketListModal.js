import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { setWorkspace } from "../../../redux/ducks/workspacesDuck";
import { updateWorkspace } from "../../../services/workspaceApi";
import { useState } from "react";

const NewTicketListModal = (props) => {
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
			(w) => w.name === props.workspaceName
		);

		const indexBoard = workspace.boards.findIndex(
			(b) => b.name === props.boardName
		);

		workspace.boards[indexBoard].ticketLists.push(newTicketList);

		// update storage
		updateWorkspace(workspace, props.workspaceName, props.email);

		// update redux
		props.dispatch(setWorkspace(workspace, props.workspaceName));

		if (props.callBackHideModal !== undefined) {
			props.callBackHideModal();
		}
	};

	return (
		<Modal>
			<label>Inserisci titolo lista</label>
			<input type={"text"} onChange={takeinput}></input>

			<SubmitButton label="Annulla" />
			<SubmitButton onClick={addTicketList} label="Crea" />
		</Modal>
	);
};

const mapStateToProps = (state) => {};

NewTicketListModal.propTypes = {
	boardName: PropTypes.string,
};

export default connect(mapStateToProps)(NewTicketListModal);
