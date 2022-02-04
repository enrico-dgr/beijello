import "./input.css";

import React, { Component } from "react";

import PropTypes from "prop-types";
import error from "../../../../assets/images/exclamation (1).png";

class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			onFocus: false,
		};
	}

	onChange = (e) => {
		this.props.onChangeCallback(e);
	};

	inputOnFocus = () => {
		this.setState({ onFocus: true });
	};

	inputOnBlur = () => {
		this.setState({ onFocus: false });
	};

	render() {
		return (
			<div
				className={`input-container ${this.props.classNameContainer}`}
			>
				<input
					className={`input ${this.props.classNameInput}`}
					required={this.props.required}
					type={this.props.type}
					value={this.props.value}
					onBlur={this.inputOnBlur}
					onChange={this.onChange}
					onFocus={this.inputOnFocus}
				/>
				<span className="input-focus"></span>
				<label
					className={`${
						!!this.props.value ? "filled" : ""
					}`}
				>
					{this.props.label}
				</label>

				{!this.state.onFocus && this.props.errorFlag && (
					<div className="errorMessage">
						<span className="errorIsRed">
							{this.props.errorText}
						</span>
						<img
							src={error}
							alt="exclamation"
							className="errorImg"
						/>
					</div>
				)}
			</div>
		);
	}
}

Input.defaultProps = {
	classNameContainer: "",
	classNameInput: "",
	label: "input text",
	height: 80,
	onChangeCallback: () => undefined,
	required: false,
	type: "text",
};

Input.propTypes = {
	classNameContainer: PropTypes.string,
	classNameInput: PropTypes.string,
	label: PropTypes.string,
	onChangeCallback: PropTypes.func,
	required: PropTypes.bool,
	type: PropTypes.string,
	value: PropTypes.string,
};

export default Input;
