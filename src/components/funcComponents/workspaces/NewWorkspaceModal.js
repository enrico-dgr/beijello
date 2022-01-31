/* workspaceAPI */
import {
	addWorkSpace,
	getWorkSpacesByEmail,
} from "../../../services/workspaceApi";
import { useEffect, useState } from "react";

/* funcComponents */
import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
/* redux */
import { connect } from "react-redux";
import { setWorkspaces } from "../../../redux/ducks/workspacesDuck";

const mapStateToProps = (state) => {
	return {
		email: state.userMeDuck.user.email,
		workspaces: state.workspacesDuck.workspaces,
	};
};

const WorkSpaceModal = (props) => {
	const [state, setState] = useState({
		inputValue: null,
	});

	const takeinput = (e) => {
		let value = e.target.value;
		setState({
			...state,
			inputValue: value,
		});
	};

	const handlerHideModal = () => {
		if (props.callBackHideModal !== undefined) {
			props.callBackHideModal();
		}
	};

	/*adding New Work workspace */
	const addNewWorkspace = () => {
		let ob = {
			name: state.inputValue,
			users: [{ email: props.email, role: "admin" }],
			boards: [],
		};
		addWorkSpace(ob);
		props.dispatch(setWorkspaces(getWorkSpacesByEmail(props.email)));
		if (props.callBackHideModal !== undefined) {
			props.callBackHideModal();
		}
	};

	return (
		<>
			<Modal>
				<label>inserisci nome workspace</label>
				<input type={"text"} onChange={takeinput}></input>

				<SubmitButton
					onClick={handlerHideModal}
					label="annulla"
				></SubmitButton>
				<SubmitButton
					onClick={addNewWorkspace}
					label="crea "
				></SubmitButton>
			</Modal>
		</>
	);
};

WorkSpaceModal.defaultProps = {};

WorkSpaceModal.propTypes = {
	callBackHideModal: PropTypes.func,
};

export default connect(mapStateToProps)(WorkSpaceModal);
