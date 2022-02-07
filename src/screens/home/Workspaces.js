import "./Workspaces.css";

import React, { Component } from "react";

import Button from "../../components/funcComponents/UI/button/Button";
import NewWorkspaceModal from "../../components/funcComponents/workspaces/NewWorkspaceModal";
import Workspace from "../../components/funcComponents/workspaces/Workspace";
import { connect } from "react-redux";
import { t } from "i18next";
import { withTranslation } from "react-i18next";

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

	/* modal view METHODS */
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
	/*  */

	render() {
		const { t } = this.props;
		return (
			<div className="workspaces-container">
				{this.state.modalflag && (
					<NewWorkspaceModal onHideModal={this.hideModal} />
				)}
				<div className="cover-workspaces">
					<div className="workspace-button-create">
						<Button
							label={t("Workspaces.NewWorkspace")}
							onClick={this.viewModal}
						/>
					</div>
					<div className="workspaces-list">
						{this.props.workspaces?.map(
							this.RenderWorkspaces
						)}
					</div>
				</div>
			</div>
		);
	}

	RenderWorkspaces = (w, i) =>
		!!w.id && (
			<div className="workspace-container" key={i + "workspace-ma"}>
				<Workspace
					workspace={w}
					labelWorkspace={t("Workspaces.LabelWorkspace")}
				/>
			</div>
		);
}

export default connect(mapStateToProps)(withTranslation()(Workspaces));
