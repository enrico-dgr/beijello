import React, { useState } from 'react';
import TicketList from '../../components/funcComponents/TicketList'
import './Board.css'
const Board = () => {

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

    const renderTicketList = (ticketList, i) => {
        return <TicketList key={ticketList.name} ticketList={ticketList} />
    }
    return (

        <>
            <div className='board-wrapper'>
                <div className='board-title'>
                    <h3 >{board.name}</h3>
                </div>
                <div className="board-container">
                    {board.ticketLists.map(renderTicketList)}
                </div>
            </div>

        </>
    )

}

export default Board