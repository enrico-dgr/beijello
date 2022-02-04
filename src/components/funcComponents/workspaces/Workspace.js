import "./Workspace.css";

import BoardPreview from "./BoardPreview";
import HandleCollaborators from "./HandleCollaborators";
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
			<div className={"workspace__header"}>
				<span>{props.labelWorkspace}</span>
				<h2>{props.workspace.name}</h2>
			</div>
			<div className={"workspace__btns"}>
				<RemoveWorkspace workspaceId={props.workspace.id} />
				<HandleCollaborators
					workspaceName={props.workspace.name}
					workspaceId={props.workspace.id}
				/>
			</div>
			<div className={"workspace__board-preview-list"}>
				<NewBoard workspaceId={props.workspace.id} />
				{props.workspace?.boards.map(
					MapPreview(props.workspace)
				)}
			</div>
		</div>
	);
};

// assign keys to each BoardPreview
const MapPreview = (workspace) => (board, i) =>
	!!board.id && (
		<div key={i + "board-preview-ke"}>
			<BoardPreview
				layout={board.layout}
				boardId={board.id}
				boardName={board.name}
				workspaceId={workspace.id}
				workspaceName={workspace.name}
			/>
		</div>
	);

Workspace.propTypes = {
	workspace: PropTypes.object,
	labelWorkspace: PropTypes.string,
};

export default connect(mapStateToProps)(Workspace);
