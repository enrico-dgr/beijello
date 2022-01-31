import "./Workspaces.css";

import React, { Component } from "react";
import {
	addWorkSpace,
	getWorkSpacesByEmail,
} from "../../../services/workspaceApi";

/* funcComponents */
import Button from "../../../components/funcComponents/UI/button/Button";
import Modal from "../../../components/funcComponents/Modal";
/* redux */
import { connect } from "react-redux";
import { setWorkspaces } from "../../../redux/ducks/workspacesDuck";

/* Services WorkspaceApi */

const mapStateToProps = (state) => {
	return {
		email: state.userMeDuck.user.email,
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
	componentDidMount() {
		this.props.dispatch(
			setWorkspaces(getWorkSpacesByEmail(this.props.email))
		);
	}
	componentDidUpdate() {}

	/*adding New Work space */
	addNewWorkspace = () => {
		this.setState({
			modalflag: true,
		});

		let ob = {
			name: "ciccio",
			users: [{ email: this.props.email, role: "admin" }],
		};
		addWorkSpace(ob);
		this.props.dispatch(
			setWorkspaces(getWorkSpacesByEmail(this.props.email))
		);
	};
	render() {
		return (
			<div className="container-workspaces">
				{this.state.modalflag && <Modal />}
				{this.props.workspaces.map((w, i) => (
					<div key={i + "kuyyfvk"}>Workspace</div>
				))}
				<div className="aside-left">
					<div className="branch-aside-workspace">
						spazi di lavoro
						<Button
							label="+"
							onClick={this.addNewWorkspace}
						/>
					</div>
					<div></div>
				</div>
				<div className="aside-right"></div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Workspaces);
