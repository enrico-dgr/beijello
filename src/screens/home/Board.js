import "./Board.css";

import React, { useEffect, useState } from "react";

/* func Components */
import Button from "../../components/funcComponents/UI/button/Button";
import NewTicketListModal from "../../components/funcComponents/board/NewTicketListModal";
import TicketList from "../../components/funcComponents/board/TicketList";
/*  */
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
			/* find board to show */
			const newBoard = props.workspaces
				.find((w) => w.name === params.workspaceName)
				.boards.find((b) => b.name === params.boardName);

			setBoard(newBoard);
		}
	}, [params, props.workspaces]);

	/* manage modal */
	const openModal = () => {
		setModalFlag(true);
	};
	const closeModal = () => {
		setModalFlag(false);
	};

	return (
		<div className="board-wrapper">
			<header className="board-header">
				<div className="board-header-top">
					<h3>
						<span>Board:</span> {!!board && board.name}
					</h3>
				</div>
				<div className="board-header-bottom">
					<Button
						label={`+ ${t("Board.NewList")}`}
						onClick={openModal}
						className={"board-btn-add-list"}
					/>
				</div>
			</header>
			<div className="board-ticketLists">
				{!!board && board.ticketLists.map(RenderTicketList)}
			</div>

			{modalFlag && (
				<NewTicketListModal onClickButton={closeModal} />
			)}
		</div>
	);
};

const RenderTicketList = (ticketList, i) => {
	return (
		!!ticketList.name && (
			<TicketList
				key={ticketList.name + i}
				ticketList={ticketList}
			/>
		)
	);
};

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

export default connect(mapStateToProps)(Board);
