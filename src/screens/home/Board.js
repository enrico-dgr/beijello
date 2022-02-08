import "./Board.css";

import React, { useEffect, useState } from "react";

/* func Components */
import Button from "../../components/funcComponents/UI/button/Button";
import NewTicketListModal from "../../components/funcComponents/board/NewTicketListModal";
import TicketList from "../../components/funcComponents/board/TicketList";
/*  */
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
/* i18n */
import { useTranslation } from "react-i18next";

const Board = (props) => {
	const [board, setBoard] = useState({});
	const [modalFlag, setModalFlag] = useState(false);
	const params = useParams();
	const { t } = useTranslation();

	useEffect(() => {
		if (
			props.workspaces.length > 0 &&
			params.boardId !== undefined &&
			params.workspaceId !== undefined
		) {
			/* find board to show */
			const boardToShow = props.workspaces
				.find((w) => w.id === parseInt(params.workspaceId))
				?.boards?.find(
					(b) => b.id === parseInt(params.boardId)
				);

			setBoard(boardToShow ?? {});
		}
	}, [params, props.workspaces]);

	const openModal = () => {
		setModalFlag(true);
	};
	const closeModal = () => {
		setModalFlag(false);
	};

	return (
		<div className={`board-wrapper layout-${board?.layout}`}>
			<header className="board-header">
				<div className="board-header-top">
					<h3>
						<span>{t("Board.LabelBoard")}:</span>{" "}
						{board.name}
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
				{!!board.id &&
					props.workspaces
						.find(
							(w) =>
								w.id ===
								parseInt(params.workspaceId)
						)
						?.ticketLists?.filter(filterLists(board.id))
						.map(RenderTicketList)}
			</div>

			{modalFlag && (
				<NewTicketListModal onClickButton={closeModal} />
			)}
		</div>
	);
};

const filterLists = (boardId) => (ticketList) => boardId === ticketList.boardId;

const RenderTicketList = (ticketList, i) => (
	<TicketList
		key={ticketList.name + i + ticketList.id}
		ticketList={ticketList}
	/>
);

const mapStateToProps = (state) => ({
	workspaces: state.workspacesDuck.workspaces,
});

export default connect(mapStateToProps)(Board);
