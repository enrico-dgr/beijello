import "./NewWorkspaceModal.css";

import Input from "../UI/input/Input";
import Modal from "../Modal";
import PropTypes from "prop-types";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { createWorkspace } from "../../../services/workspaceApi";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();

	const setName = (e) => {
		let value = e.target.value;
		setState({
			...state,
			name: value,
		});
	};

	const handlerHideModal = () => {
		props.onHideModal();
	};

	/*adding New Work workspace */
	const addNewWorkspace = () => {
		createWorkspace(
			{ name: state.name },
			props.user.id,
			props.dispatch
		);

		props.onHideModal();
	};

	return (
		<Modal className={"new-workspace-modal"}>
			<Input
				type="text"
				label={t("Workspaces.LabelWorkspace")}
				value={state.name}
				onChangeCallback={setName}
				errorFlag={false}
				errorText={""}
			/>
			<div className={"new-workspace-modal__btns"}>
				<SubmitButton
					onClick={handlerHideModal}
					label={t(
						"Workspaces.NewWorkspaceModal.BtnCancel"
					)}
				></SubmitButton>
				<SubmitButton
					onClick={addNewWorkspace}
					label={t(
						"Workspaces.NewWorkspaceModal.BtnCreate"
					)}
				></SubmitButton>
			</div>
		</Modal>
	);
};

WorkSpaceModal.defaultProps = {
	onHideModal: () => undefined,
};

WorkSpaceModal.propTypes = {
	onHideModal: PropTypes.func,
};

export default connect(mapStateToProps)(WorkSpaceModal);
