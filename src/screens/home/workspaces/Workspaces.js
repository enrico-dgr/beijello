import "./Workspaces.css";

import React, { Component } from "react";

/* funcComponents */
import Button from "../../../components/funcComponents/UI/button/Button";
import WorkSpaceModal from "../../../components/funcComponents/workspaces/NewWorkspaceModal";
import Workspace from "../../../components/funcComponents/workspaces/Workspace";
/* redux */
import { connect } from "react-redux";
/* Services WorkspaceApi */
import { getWorkSpacesByEmail } from "../../../services/workspaceApi";
import { setWorkspaces } from "../../../redux/ducks/workspacesDuck";

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
        console.log(this.props.email);
        this.props.dispatch(
            setWorkspaces(getWorkSpacesByEmail(this.props.email))
        );
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.email !== undefined &&
            prevProps.email !== this.props.email
        ) {
            console.log(this.props.email);
            this.props.dispatch(
                setWorkspaces(getWorkSpacesByEmail(this.props.email))
            );
        }
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
            <div className="container-workspaces">
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
                {this.props.workspaces.map(this.RenderWorkspaces) }
            </div>
        );
    }

    RenderWorkspaces =
         (w, i) => (
            <div key={i + "workspace-ma"}>
                <Workspace
                    boards={w.boards}
                    customKey={i + "workspace-map"}
                    name={w.name}
                />
            </div>
        )

}

export default connect(mapStateToProps)(Workspaces);
