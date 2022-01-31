
import React, { Component } from "react";
import "./Workspaces.css"
/* redux */
import { connect } from "react-redux";

/* Services WorkspaceApi */

import { addWorkSpace, getWorkSpacesByEmail, setWorkSpaces } from "../../../services/workspaceApi";


/* funcComponents */
import Button from "../../../components/funcComponents/UI/button/Button";
import Modal from "../../../components/funcComponents/Modal";

const mapStateToProps = (state) => {
	return { email: state.userMeDuck.user.email };
};
class Workspaces extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalflag: false,
            workspacesByEmail: null
        }
    }
    componentDidMount() {
        this.setState(
            {
                workspacesByEmail: getWorkSpacesByEmail(this.props.email),
            }
        )
    }
    componentDidUpdate() {
    }

    /*adding New Work space */
    addNewWorkspace = () => {

        this.setState({
            modalflag: true,
        })



        let ob = {
            name: 'ciccio',
            users: [{ email: 'obama', role: 'sub' }]
        }
        addWorkSpace(ob)
    }
    render() {
        return (
            <div className="container-workspaces">
                {
                    this.state.modalflag &&
                    <Modal />
                }
                <div className="aside-left">
                    <div className="branch-aside-workspace">
                        spazi di lavoro
                        <Button label="+" onClick={this.addNewWorkspace} />
                    </div>
                    <div>

                    </div>


                </div>
                <div className="aside-right">

                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps)(Workspaces);
