const BOARD_LAYOUTS = ["normal", "dark", "sunshine", "mountain"];

const getNewTicketId = (workspace, indexBoard, indexTicketList) =>
	workspace.boards[indexBoard].ticketLists[indexTicketList].tickets
		.length === 0
		? // if no ticket exists in list
		  1
		: // add with greatest id
		  workspace.boards[indexBoard].ticketLists[indexTicketList].tickets[
				workspace.boards[indexBoard].ticketLists[
					indexTicketList
				].tickets.length - 1
		  ].id + 1;

/**
 * Return the updated workspace
 */
const moveTicketTo = ({
	workspace,
	indexBoard,
	fromListId,
	fromTicketPosition,
	toListId,
	toTicketPosition,
}) => {
	const indexFromTicketList = workspace.boards[
		indexBoard
	].ticketLists.findIndex((t) => t.id === fromListId);

	// splice returns an array
	const tickets = workspace.boards[indexBoard].ticketLists[
		indexFromTicketList
	].tickets.splice(fromTicketPosition, 1);

	const indexToTicketList = workspace.boards[
		indexBoard
	].ticketLists.findIndex((t) => t.id === toListId);

	workspace.boards[indexBoard].ticketLists[indexToTicketList].tickets = [
		...workspace.boards[indexBoard].ticketLists[
			indexToTicketList
		].tickets.slice(0, toTicketPosition),
		// insert
		...tickets,
		...workspace.boards[indexBoard].ticketLists[
			indexToTicketList
		].tickets.slice(toTicketPosition + 1),
	];

	return workspace;
};

/**
 * Return the updated workspace
 */
const moveTicketToListEnd = ({
	workspace,
	indexBoard,
	fromListId,
	fromTicketPosition,
	toListId,
}) => {
	const indexFromTicketList = workspace.boards[
		indexBoard
	].ticketLists.findIndex((t) => t.id === fromListId);

	// splice returns an array
	const tickets = workspace.boards[indexBoard].ticketLists[
		indexFromTicketList
	].tickets.splice(fromTicketPosition, 1);

	const indexToTicketList = workspace.boards[
		indexBoard
	].ticketLists.findIndex((t) => t.id === toListId);

	workspace.boards[indexBoard].ticketLists[indexToTicketList].tickets = [
		...workspace.boards[indexBoard].ticketLists[indexToTicketList]
			.tickets,
		// insert
		...tickets,
	];

	return workspace;
};

export { BOARD_LAYOUTS, moveTicketTo, moveTicketToListEnd, getNewTicketId };
