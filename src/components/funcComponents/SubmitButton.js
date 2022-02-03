import React from "react";

import PropTypes from "prop-types";

import "./SubmitButton.css";

function SubmitButton(props) {
	const handleClick = (e) => {
		props.onClick(e);
	};

	return (
		<button
			className={`login-btn ${
				props.disable ? "login-btn--disabled" : ""
			} ${props.className}`}
			onClick={handleClick}
		>
			{props.label}
		</button>
	);
}

SubmitButton.defaultProps = {
	className: "",
	disable: false,
	label: "",
	onClick: () => undefined,
};

SubmitButton.propTypes = {
	className: PropTypes.string,
	disable: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default SubmitButton;
