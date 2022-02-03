import "./Workspace.css";

import BoardPreview from "./BoardPreview";
import NewBoard from "./NewBoard";
import PropTypes from "prop-types";
import React from "react";
/* fontawesome */
import RemoveWorkspace from "./RemoveWorkspace";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

const Workspace = (props) => {
	return (
		<div className={"workspace"}>
			<span>Workspace:</span>
			<h2 className="title-workspace">{props.workspace.name}</h2>
			<RemoveWorkspace workspaceId={props.workspace.id} />
			<div className={"workspace__board-preview-list"}>
				<NewBoard workspaceName={props.workspace.name} />
				{props.workspace?.boards.map(
					MapPreview(props.workspace.name)
				)}
			</div>
		</div>
	);
};

// assign keys to each BoardPreview
const MapPreview = (workspaceName) => (board, i) =>
	(
		<div key={i + "board-preview-ke"}>
			<BoardPreview
				customKey={i + "board-preview-key"}
				layout={board.layout}
				boardName={board.name}
				workspaceName={workspaceName}
			/>
		</div>
	);

Workspace.propTypes = {
	workspace: PropTypes.object,
};

export default connect(mapStateToProps)(Workspace);
