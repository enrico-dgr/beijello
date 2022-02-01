import "./BoardPreview.css";

import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

const BoardPreview = (props) => {
	const navigate = useNavigate();

	const navigateToBoard = () => {
		navigate(`/board/${props.workspaceName}/${props.boardName}`);
	};

	return (
		<div
			className={"board-preview"}
			key={props.customKey}
			onClick={navigateToBoard}
		>
			<h1>{props.boardName}</h1>
		</div>
	);
};

BoardPreview.propTypes = {
	boardName: PropTypes.string,
	customKey: PropTypes.string,
	layout: PropTypes.string,
	workspaceName: PropTypes.string,
};

export default BoardPreview;
