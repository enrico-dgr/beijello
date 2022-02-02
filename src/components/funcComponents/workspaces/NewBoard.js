import "./NewBoard.css";

import Input from "../UI/input/Input";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { setWorkspace } from "../../../redux/ducks/workspacesDuck";
import { updateWorkspace } from "../../../services/workspaceApi";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
	email: state.userMeDuck.user?.email,

	workspaces: state.workspacesDuck.workspaces,
});

const NewBoard = (props) => {
	const [state, setState] = React.useState({
		boardData: {
			name: "",
			layout: "",
		},
		showModal: false,
	});

	const { t } = useTranslation();

	const showModal = () => {
		setState({ ...state, showModal: true });
	};

	const hideModal = () => {
		console.log(state);
		setState({ ...state, showModal: false });
	};

	const setName = (e) => {
		let newState = Object.assign({}, state);
		newState.boardData.name = e.target.value;
		setState(newState);
	};

	const setLayout = (e) => {
		let newState = Object.assign({}, state);
		newState.boardData.layout = e.target.value;
		setState(newState);
	};

	const addNewBoard = () => {
		let workspace = props.workspaces.find(
			(w) => w.name === props.workspaceName
		);
		workspace.boards.push({
			...state.boardData,
			ticketLists: [],
		});

		// update storage
		updateWorkspace(workspace, props.workspaceName, props.email);

		// update redux
		props.dispatch(setWorkspace(workspace, props.workspaceName));

		hideModal();
	};

	return (
		<div>
			<div
				// class available in BoardPreview.css
				className={"add-new-board"}
				onClick={showModal}
			>
				<p>{t("Workspaces.NewBoard")}</p>
			</div>
			{/* Modal */}
			{state.showModal && (
				<Modal className={"board-preview-modal"}>
					<Input
						type="text"
						label={t("Workspaces.NewBoardName")}
						value={state.name}
						onChangeCallback={setName}
						errorFlag={false}
						errorText={""}
					/>
					<label>
						{"Layout"}
						<select
							value={"normal"}
							onChange={setLayout}
						>
							<option value="normal">
								{"Normal"}
							</option>
							<option value="dark">{"Dark"}</option>
							<option value="fancy">
								{"Fancy"}
							</option>
						</select>
					</label>
					<div
						className={
							"board-preview-modal__btns-container"
						}
					>
						<SubmitButton
							onClick={hideModal}
							label={t("Workspaces.NewBoardCancel")}
						></SubmitButton>
						<SubmitButton
							onClick={addNewBoard}
							label={t("Workspaces.NewBoardCreate")}
						></SubmitButton>
					</div>
				</Modal>
			)}
		</div>
	);
};

NewBoard.propTypes = {
	workspaceName: PropTypes.string,
};

export default connect(mapStateToProps)(NewBoard);
