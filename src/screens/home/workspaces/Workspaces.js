import "./Workspaces.css";

import React, { Component } from "react";
/* Services WorkspaceApi */
import {
	addWorkSpaces,
	getWorkSpacesByEmail,
} from "../../../services/workspaceApi";

/* funcComponents */
import Button from "../../../components/funcComponents/UI/button/Button";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return { email: state.userMeDuck.user.email };
};
class Workspaces extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workspacesByEmail: null,
		};
	}
	componentDidMount() {
		this.setState({
			workspacesByEmail: getWorkSpacesByEmail(this.props.email),
		});
	}
	componentDidUpdate() {}

	/*adding New Work space */
	addNewWorkspace = () => {
		let ob = {
			name: "ciccio",
			users: [{ email: "obama", role: "sub" }],
		};
		addWorkSpaces(ob);
	};
	render() {
		return (
			<div className="container-workspaces">
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
