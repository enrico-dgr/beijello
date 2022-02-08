import "./NewBoard.css";

import { BOARD_LAYOUTS } from "../../../utils/workspace";
import Input from "../UI/input/Input";
import Modal from "../Modal";
import PropTypes from "prop-types";
import React from "react";
import SubmitButton from "../SubmitButton";
import { connect } from "react-redux";
import { createBoard } from "../../../services/workspaceApi";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
	userId: state.userMeDuck.user?.id,
	workspaces: state.workspacesDuck.workspaces,
});

const NewBoard = (props) => {
	const [state, setState] = React.useState({
		boardData: {
			name: "",
			layout: BOARD_LAYOUTS[0],
		},
		showModal: false,
	});

	const { t } = useTranslation();

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
		createBoard(
			{
				name: state.boardData.name,
				layout: state.boardData.layout,
				workspaceId: props.workspaceId,
			},
			props.userId,
			props.dispatch
		);

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
						value={state.boardData.name}
						onChangeCallback={setName}
						errorFlag={false}
						errorText={""}
					/>
					<div className={"select-layout"}>
						<label>Layout</label>
						<select
							value={state.boardData.layout}
							onChange={setLayout}
						>
							{!!BOARD_LAYOUTS &&
								BOARD_LAYOUTS.map(
									MapLayoutsOptions
								)}
						</select>
					</div>
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

const MapLayoutsOptions = (l, i) => (
	<option key={"layouts" + l + i} value={l}>
		{l}
	</option>
);

NewBoard.propTypes = {
	workspaceId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(NewBoard);
