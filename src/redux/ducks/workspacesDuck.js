import _ from "lodash";
// Actions
const SET_WORKSPACES = "web/workspaces/SET_WORKSPACES";
const SET_WORKSPACE = "web/workspaces/SET_WORKSPACE";
const SET_BOARD = "web/workspaces/SET_BOARD";
const SET_TICKELIST = "web/workspaces/SET_TICKELIST";
const SET_TICKET = "web/workspaces/SET_TICKET";

// Action Creators
export function setWorkspaces(workspaces) {
	return {
		type: SET_WORKSPACES,
		payload: {
			workspaces,
		},
	};
}

export function setWorkspace(workspace, workspaceName) {
	return {
		type: SET_WORKSPACE,
		payload: {
			workspace,
			workspaceName,
		},
	};
}

export function setBoard({ board, boardName, workspaceName }) {
	return {
		type: SET_BOARD,
		payload: {
			board,
			boardName,
			workspaceName,
		},
	};
}

export function setTicketList({
	ticketList,
	ticketListName,
	boardName,
	workspaceName,
}) {
	return {
		type: SET_TICKELIST,
		payload: {
			ticketList,
			ticketListName,
			boardName,
			workspaceName,
		},
	};
}

export function setTicket({
	ticket,
	ticketName,
	ticketListName,
	boardName,
	workspaceName,
}) {
	return {
		type: SET_TICKET,
		payload: {
			ticket,
			ticketName,
			ticketListName,
			boardName,
			workspaceName,
		},
	};
}

const INIT_STATE = {
	workspaces: [],
};

// Reducer
export default function workspaceDuck(state = INIT_STATE, action) {
	let newState = {};
	let workspaceIndex = -1;
	let boardIndex = -1;
	let ticketListIndex = -1;
	let ticketIndex = -1;

	switch (action.type) {
		case SET_WORKSPACES:
			newState = _.cloneDeep(state);
			newState.workspaces = action.payload.workspaces;
			return newState;

		case SET_WORKSPACE:
			newState = _.cloneDeep(state);
			workspaceIndex = newState.workspaces.findIndex(
				(w) => w.name === action.payload.workspaceName
			);

			if (workspaceIndex < 0) {
				return state;
			}

			newState.workspaces[workspaceIndex] =
				action.payload.workspace;
			return newState;

		case SET_BOARD:
			newState = _.cloneDeep(state);
			workspaceIndex = newState.workspaces.findIndex(
				(w) => w.name === action.payload.workspaceName
			);

			if (workspaceIndex < 0) {
				return state;
			}

			boardIndex = newState.workspaces[
				workspaceIndex
			].boards.findIndex(
				(b) => b.name === action.payload.boardName
			);

			if (boardIndex < 0) {
				return state;
			}

			newState.workspaces[workspaceIndex].boards[boardIndex] =
				action.payload.board;
			return newState;

		case SET_TICKELIST:
			newState = _.cloneDeep(state);
			workspaceIndex = newState.workspaces.findIndex(
				(w) => w.name === action.payload.workspaceName
			);

			if (workspaceIndex < 0) {
				return state;
			}

			boardIndex = newState.workspaces[
				workspaceIndex
			].boards.findIndex(
				(b) => b.name === action.payload.boardName
			);

			if (boardIndex < 0) {
				return state;
			}

			ticketListIndex = newState.workspaces[workspaceIndex].boards[
				boardIndex
			].ticketLists.findIndex(
				(tL) => tL.name === action.payload.ticketListName
			);

			if (ticketListIndex < 0) {
				return state;
			}

			newState.workspaces[workspaceIndex].boards[
				boardIndex
			].ticketLists[ticketListIndex] = action.payload.ticketList;
			return newState;

		case SET_TICKET:
			newState = _.cloneDeep(state);
			workspaceIndex = newState.workspaces.findIndex(
				(w) => w.name === action.payload.workspaceName
			);

			if (workspaceIndex < 0) {
				return state;
			}

			boardIndex = newState.workspaces[
				workspaceIndex
			].boards.findIndex(
				(b) => b.name === action.payload.boardName
			);

			if (boardIndex < 0) {
				return state;
			}

			ticketListIndex = newState.workspaces[workspaceIndex].boards[
				boardIndex
			].ticketLists.findIndex(
				(tL) => tL.name === action.payload.ticketListName
			);

			if (ticketListIndex < 0) {
				return state;
			}

			ticketIndex = newState.workspaces[workspaceIndex].boards[
				boardIndex
			].ticketLists[ticketListIndex].tickets.findIndex(
				(t) => t.name === action.payload.ticketName
			);

			if (ticketIndex < 0) {
				return state;
			}

			newState.workspaces[workspaceIndex].boards[
				boardIndex
			].ticketLists[ticketListIndex].tickets[ticketIndex] =
				action.payload.ticket;

			return newState;

		default:
			return state;
	}
}
