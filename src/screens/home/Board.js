import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

import BoardModal from '../home/board/BoardModal';
import TicketList from '../../components/funcComponents/TicketList';
import Button from '../../components/funcComponents/UI/button/Button';
import './Board.css'


const Board = (props) => {
    // const [board, setBoard] = useState(null)
    const [modalFlag, setModalFlag] = useState(false)
    const [board, setBoard] = useState({
        name: 'board title',
        layout: 'board layout',
        ticketLists: [
            {                           //obj -> single ticket list
                name: 'ticket list title 0',
                tickets: [
                    {                   //obj -> single ticket
                        name: 'ticket title',
                        description: 'ticket description',
                    }
                ]
            },
            {                           //obj -> single ticket list
                name: 'ticket list title 1',
                tickets: [
                    {                   //obj -> single ticket
                        name: 'ticket title',
                        description: 'ticket description',
                    }
                ]
            },
            {                           //obj -> single ticket list
                name: 'ticket list title 2',
                tickets: [
                    {                   //obj -> single ticket
                        name: 'ticket title',
                        description: 'ticket description',
                    }
                ]
            },
            {                           //obj -> single ticket list
                name: 'ticket list title 3',
                tickets: [
                    {                   //obj -> single ticket
                        name: 'ticket title',
                        description: 'ticket description',
                    }
                ]
            },
            {                           //obj -> single ticket list
                name: 'ticket list title 4',
                tickets: [
                    {                   //obj -> single ticket
                        name: 'ticket title',
                        description: 'ticket description',
                    }
                ]
            },
        ]
    })

    const params = useParams()

    // useEffect(() => {
    //     if (props.boards !== undefined && params.name !== undefined) {
    //         const newBoard = props.boards.find(b => b.name === params.name)
    //             setBoard(newBoard)
    //     }

    // }, [])

    const openModal = () => {
        // const newTicketList = [{
        //     name: ''
        // }]
        setModalFlag(true)
    }

    const renderTicketList = (ticketList, i) => {
        return <TicketList key={ticketList.name} ticketList={ticketList} />
    }
    return (

        <>
            <div className='board-wrapper'>
                <div className='board-title'>
                    <h3 >{!!board && board.name}</h3>
                </div>
                <div className="board-container">
                    {!!board && board.ticketLists.map(renderTicketList)}
                    <Button label="+ Aggiungi lista" onClick={openModal} className={'board-btn-add-list'} />
                </div>
                {modalFlag && <BoardModal ticketList={board.ticketLists}/>}
            </div>

        </>
    )

}

const mapStateToProps = (state) => {
    console.log(state);
    return { boards: state.workspacesDuck.workspaces?.boards };
};

Board.propTypes = {
    name: Proptypes.string,
    ticketList: Proptypes.array,
}

export default connect(mapStateToProps)(Board)