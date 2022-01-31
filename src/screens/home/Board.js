import "./Board.css";

import React, { useEffect, useState } from "react";

import Button from "../../components/funcComponents/UI/button/Button";
import NewTicketListModal from "../../components/funcComponents/board/NewTicketListModal";
import PropTypes from "prop-types";
import TicketList from "../../components/funcComponents/TicketList";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Board = (props) => {
	const [board, setBoard] = useState(undefined);
	const [modalFlag, setModalFlag] = useState(false);
	const params = useParams();

	useEffect(() => {
		if (props.boards !== undefined && params.name !== undefined) {
			const newBoard = props.boards.find(
				(b) => b.name === params.name
			);
			setBoard(newBoard);
		}
	}, [params.name, props.boards]);

	const openModal = () => {
		setModalFlag(true);
	};

	const renderTicketList = (ticketList, i) => {
		return <TicketList key={ticketList.name} ticketList={ticketList} />;
	};
	return (
		<>
			<div className="board-wrapper">
				<div className="board-title">
					<h3>{!!board && board.name}</h3>
				</div>
				<div className="board-container">
					{!!board &&
						board.ticketLists.map(renderTicketList)}
					<Button
						label="+ Aggiungi lista"
						onClick={openModal}
						className={"board-btn-add-list"}
					/>
				</div>
				{modalFlag && (
					<NewTicketListModal boardName={board.name} />
				)}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	return { boards: state.workspacesDuck.workspaces?.boards };
};

Board.propTypes = {
	name: PropTypes.string,
	ticketList: PropTypes.array,
};

export default connect(mapStateToProps)(Board);
