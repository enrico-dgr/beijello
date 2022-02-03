import "./BoardPreview.css";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/* fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
/*  */

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
			<span className="delete-board"> <FontAwesomeIcon icon={faTrash} /></span>
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
