import BoardPreview from "./BoardPreview";
import NewBoard from "./NewBoard";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const Workspace = (props) => {
	return (
		<div className={"workspace"} key={props.customKey}>
			<h1>{props.name}</h1>
			<div className={"workspace__board-preview-list"}>
				<NewBoard workspaceName={props.name} />
				{props.workspaces
					.find((w) => w.name === props.name)
					?.boards.map(MapPreview)}
			</div>
		</div>
	);
};

// assign keys to each BoardPreview
const MapPreview = (board, i) => (
	<div key={i + "board-preview-ke"}>
		<BoardPreview
			customKey={i + "board-preview-key"}
			layout={board.layout}
			name={board.name}
		/>
	</div>
);

Workspace.propTypes = {
	name: PropTypes.string,
	// each containing `name` and `layout`
	boards: PropTypes.array,
	customKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

export default connect(mapStateToProps)(Workspace);
