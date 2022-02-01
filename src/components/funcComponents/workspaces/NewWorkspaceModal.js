import "./NewWorkspaceModal.css";

/* workspaceAPI */
import {
	addWorkSpace,
	getWorkSpacesByEmail,
} from "../../../services/workspaceApi";

import Input from "../UI/input/Input";
/* funcComponents */
import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
/* redux */
import { connect } from "react-redux";
import { setWorkspaces } from "../../../redux/ducks/workspacesDuck";
import { useState } from "react";

const mapStateToProps = (state) => {
	return {
		email: state.userMeDuck.user.email,
		workspaces: state.workspacesDuck.workspaces,
	};
};

const WorkSpaceModal = (props) => {
	const [state, setState] = useState({
		name: "",
	});

	const setName = (e) => {
		let value = e.target.value;
		setState({
			...state,
			name: value,
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
			name: state.name,
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
		<Modal className={"new-workspace-modal"}>
			<Input
				type="text"
				label="Workspace name"
				value={state.name}
				onChangeCallback={setName}
				errorFlag={false}
				errorText={""}
			/>
			<SubmitButton
				onClick={handlerHideModal}
				label="annulla"
			></SubmitButton>
			<SubmitButton
				onClick={addNewWorkspace}
				label="crea "
			></SubmitButton>
		</Modal>
	);
};

WorkSpaceModal.defaultProps = {};

WorkSpaceModal.propTypes = {
	callBackHideModal: PropTypes.func,
};

export default connect(mapStateToProps)(WorkSpaceModal);
