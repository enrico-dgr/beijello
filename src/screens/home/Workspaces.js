import "./Workspaces.css";

import React, { Component } from "react";

/* funcComponents */
import Button from "../../components/funcComponents/UI/button/Button";
import WorkSpaceModal from "../../components/funcComponents/workspaces/NewWorkspaceModal";
import Workspace from "../../components/funcComponents/workspaces/Workspace";
/* redux */
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		email: state.userMeDuck.user?.email,
		workspaces: state.workspacesDuck.workspaces,
	};
};
class Workspaces extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalflag: false,
		};
	}

	/* modal view */
	hideModal = () => {
		this.setState({
			modalflag: false,
		});
	};
	viewModal = () => {
		this.setState({
			modalflag: true,
		});
	};

	render() {
		return (
			<div className="workspaces-container">
				{this.state.modalflag && (
					<WorkSpaceModal
						callBackHideModal={this.hideModal}
					/>
				)}
				<div className="aside-left">
					<div className="branch-aside-workspace">
						spazi di lavoro
						<Button
							label="+"
							onClick={this.viewModal}
						/>
					</div>
					<div></div>
				</div>
				{this.props.workspaces?.map(this.RenderWorkspaces)}
			</div>
		);
	}

	RenderWorkspaces = (w, i) => (
		<div key={i + "workspace-ma"}>
			<Workspace
				boards={w.boards}
				customKey={i + "workspace-map"}
				name={w.name}
			/>
		</div>
	);
}

export default connect(mapStateToProps)(Workspaces);
