import BoardPreview from "./BoardPreview";
import NewBoard from "./NewBoard";
import PropTypes from "prop-types";
import React from "react";

const Workspace = (props) => {
	return (
		<div className={"workspace"} key={props.customKey}>
			<h1>{props.name}</h1>
			<div className={"workspace__board-preview-list"}>
				<NewBoard workspaceName={props.name} />
				{props.boards.map(MapPreview)}
			</div>
		</div>
	);
};

// assign keys to each BoardPreview
const MapPreview = (board, i) => (
	<BoardPreview
		customKey={i + "board-preview-key"}
		layout={board.layout}
		name={board.name}
	/>
);

Workspace.propTypes = {
	name: PropTypes.string,
	// each containing `name` and `layout`
	boards: PropTypes.array,
	customKey: PropTypes.string,
};

export default Workspace;
