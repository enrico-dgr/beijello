import React from 'react';
<<<<<<< HEAD
import SubmitButton from '../SubmitButton'
=======

>>>>>>> 6a15be6f18cbdcf2be6069c712f19c81c90d0e07
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