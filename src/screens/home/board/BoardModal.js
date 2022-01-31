import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { connect } from "react-redux";

import Modal from "../../../components/funcComponents/Modal"
import SubmitButton from "../../../components/funcComponents/SubmitButton"

const BoardModal = (props) => {
    console.log(props.ticketList);
    const [state, setState] = useState({
        inputValue: null
    });

    const takeinput = (e) => {
        let value = e.target.value;

        setState({
            ...state,
            inputValue: value
        })
    }

    const addTitleTicketList = (e) => {
        let obj = {
                name: state.inputValue,
                tickets: []
        }
        //
    }

    return (
        <>
        <Modal>
            <label>inserisci titolo lista</label>
            <input type={"text"} onChange={takeinput}></input>

            <SubmitButton  label="annulla"></SubmitButton>
            <SubmitButton onClick={addTitleTicketList} label="crea titolo lista"></SubmitButton>
        </Modal>
    </>
    )
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(BoardModal)

// onClick={handlerHideModal}