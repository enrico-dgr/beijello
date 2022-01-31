import "./BoardPreview.css";

import PropTypes from "prop-types";
import React from "react";

const BoardPreview = (props) => {
	return (
		<div className={"board-preview"} key={props.customKey}>
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
