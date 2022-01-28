import React, { Component } from "react";
import "./Workspaces.css"

/* funcComponents */
import Button from "../../../components/funcComponents/UI/button/Button";

class Workspaces extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {

    }


    render() {
        return (
            <div className="container-workspaces">
                <div className="aside-left">
                    <div className="branch-aside-workspace">
                        spazi di lavoro
                        <Button label="+" /* onClick={} */ />
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


export default Workspaces