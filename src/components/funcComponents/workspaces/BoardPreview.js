import "./BoardPreview.css";

import PropTypes from "prop-types";
import React from "react";
import RemoveBoard from "./RemoveBoard";
import { useNavigate } from "react-router-dom";

const BoardPreview = (props) => {
	const navigate = useNavigate();

	const navigateToBoard = (e) => {
		navigate(
			`/board/${props.workspaceName}/${props.workspaceId}/${props.boardName}/${props.boardId}`
		);
	};

	return (
		<div className={"board-preview-container"}>
			<div className={"board-preview"} onClick={navigateToBoard}>
				<p>{props.boardName}</p>
			</div>
			<RemoveBoard
				boardId={props.boardId}
				classNameContainer="delete-board"
				workspaceId={props.workspaceId}
			/>
		</div>
	);
};

BoardPreview.propTypes = {
	boardId: PropTypes.number.isRequired,
	boardName: PropTypes.string.isRequired,
	layout: PropTypes.string.isRequired,
	workspaceId: PropTypes.number.isRequired,
	workspaceName: PropTypes.string.isRequired,
};

export default BoardPreview;
