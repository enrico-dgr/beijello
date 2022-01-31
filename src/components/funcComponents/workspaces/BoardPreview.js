import "./BoardPreview.css";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";

const BoardPreview = (props) => {

	const navigate = useNavigate()

	const navigateToBoard = () => {
		navigate(`/board/${props.name}`,{'state': {name:props.name}})
	}

	return (
		<div className={"board-preview"} key={props.customKey} onClick={navigateToBoard}>
			<h1>{props.name}</h1>
		</div>
	);
};

BoardPreview.propTypes = {
	name: PropTypes.string,
	customKey: PropTypes.string,
	layout: PropTypes.string,
};

export default BoardPreview;
