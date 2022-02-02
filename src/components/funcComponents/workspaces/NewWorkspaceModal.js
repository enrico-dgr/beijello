import "./NewWorkspaceModal.css";

import Input from "../UI/input/Input";
/* funcComponents */
import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
/* redux */
import { connect } from "react-redux";
import { setWorkspaces } from "../../../redux/ducks/workspacesDuck";
import { toast } from "react-toastify";
import { useState } from "react";
import workspacesAPI from "../../../services/workspacesApi";

const mapStateToProps = (state) => {
	return {
		user: state.userMeDuck.user,
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
		workspacesAPI
			.create({ name: state.name }, props.user.id, props.dispatch)
			.catch((err) =>
				toast.error(err.message, {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			);

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
