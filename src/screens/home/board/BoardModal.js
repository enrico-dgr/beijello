import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { connect } from "react-redux";

import Modal from "../../../components/funcComponents/Modal"
import SubmitButton from "../../../components/funcComponents/SubmitButton"

const BoardModal = (props) => {
    console.log(props.ticketList);
    const [state, setState] = useState({
        ticketListTitle: null
    });

    const takeinput = (e) => {
        let value = e.target.value;

        setState({
            ...state,
            ticketListTitle: value
        })
    }

    const addTicketList = () => {
        let newTicketList = {
            name: state.ticketListTitle,
            tickets: []
        }

        let workspace = props.workspaces.find(
            (w) => w.name === props.workspaceName
        );
        workspace.boards.push({
            ...state.boardData,
            ticketLists: [],
        });

        // update storage
        // updateWorkspace(workspace, props.workspaceName, props.email);

        // update redux
        // props.dispatch(setWorkspace(workspace, props.workspaceName));

        if (props.callBackHideModal !== undefined) {
            props.callBackHideModal();
        }
    };

    return (
        <>
            <Modal>
                <label>inserisci titolo lista</label>
                <input type={"text"} onChange={takeinput}></input>

                <SubmitButton label="annulla"></SubmitButton>
                <SubmitButton onClick={addTicketList} label="crea titolo lista"></SubmitButton>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(BoardModal)

// onClick={handlerHideModal}