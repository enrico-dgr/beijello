import "./NewBoard.css";

import Input from "../UI/input/Input";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import workspacesAPI from "../../../services/workspacesApi";

const mapStateToProps = (state) => ({
	email: state.userMeDuck.user?.email,
	userId: state.userMeDuck.user?.id,

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

	const showModal = () => {
		setState({ ...state, showModal: true });
	};

	const hideModal = () => {
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

		workspacesAPI
			.update(workspace, props.userId, props.dispatch)
			.catch((err) => {
				toast.error(err, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});

		hideModal();
	};

	return (
		<div>
			<div
				// class available in BoardPreview.css
				className={"board-preview"}
				onClick={showModal}
			>
				<p>Add new board</p>
			</div>
			{/* Modal */}
			{state.showModal && (
				<Modal className={"board-preview-modal"}>
					<Input
						type="text"
						label="Board name"
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
							label="Annulla"
						></SubmitButton>
						<SubmitButton
							onClick={addNewBoard}
							label="Crea"
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
