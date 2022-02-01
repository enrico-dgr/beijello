import "./Board.css";

import React, { useEffect, useState } from "react";

import Button from "../../components/funcComponents/UI/button/Button";
import NewTicketListModal from "../../components/funcComponents/board/NewTicketListModal";
import PropTypes from "prop-types";
import TicketList from "../../components/funcComponents/TicketList";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Board = (props) => {
	const [board, setBoard] = useState(undefined);
	const [modalFlag, setModalFlag] = useState(false);
	const params = useParams();
	const { t } = useTranslation();

	useEffect(() => {
		if (
			props.workspaces.length > 0 &&
			params.boardName !== undefined &&
			params.workspaceName !== undefined
		) {
			const newBoard = props.workspaces
				.find((w) => w.name === params.workspaceName)
				.boards.find((b) => b.name === params.boardName);
			setBoard(newBoard);
		}
	}, [params, props.workspaces]);

	const openModal = () => {
		setModalFlag(true);
	};

	const closeModal = () => {
		setModalFlag(false);
	};

	const renderTicketList = (ticketList, i) => {
		return <TicketList key={ticketList.name} ticketList={ticketList} />;
	};
	return (
		<div className="board-wrapper">
			<div className="board-title">
				<h3>{!!board && board.name}</h3>
			</div>
			<div className="board-container">
				{!!board && board.ticketLists.map(renderTicketList)}
				<Button
					label={`+ ${t("Board.NewList")}`}
					onClick={openModal}
					className={"board-btn-add-list"}
				/>
			</div>
			{modalFlag && (
				<NewTicketListModal onClickButton={closeModal} />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

Board.propTypes = {
	name: PropTypes.string,
	ticketList: PropTypes.array,
};

export default connect(mapStateToProps)(Board);
