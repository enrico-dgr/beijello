import React from 'react';
import SubmitButton from '../SubmitButton'
import Modal from "../Modal";


const NewTicketModal = (props) => {

    return (
    <Modal>
        <h1>prova</h1>

        <SubmitButton label="Annulla" onClick={props.onClickButton} />
    </Modal>
    )
}

export default NewTicketModal