import { STATUS } from "../api";
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

const IDLE = "web/workspaces/" + STATUS.IDLE;
const LOADING = "web/workspaces/" + STATUS.LOADING;
const FAILURE = "web/workspaces/" + STATUS.FAILURE;
const SUCCESS = "web/workspaces/" + STATUS.SUCCESS;
const UPDATE_SUCCESS = "web/workspaces/update/" + STATUS.SUCCESS;

export const setIdle = () => ({
	type: IDLE,
	payload: {
		error: "",
		status: STATUS.IDLE,
		workspaces: [],
	},
});

export const setLoading = () => ({
	type: LOADING,
	payload: {
		status: STATUS.LOADING,
	},
});

/**
 *
 * @param {string} errorMessage
 */
export const setFailure = (errorMessage) => ({
	type: FAILURE,
	payload: {
		error: errorMessage,
		status: STATUS.FAILURE,
	},
});

export const setSuccess = (workspaces) => ({
	type: SUCCESS,
	payload: {
		status: STATUS.SUCCESS,
		workspaces,
	},
});

export const setSuccessUpdate = (workspace) => ({
	type: UPDATE_SUCCESS,
	payload: {
		status: STATUS.SUCCESS,
		workspace,
	},
});

const INIT_STATE = {
	error: "",
	status: STATUS.IDLE,
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
		case IDLE:
			return { ...state, ...action.payload };
		case LOADING:
			return { ...state, ...action.payload };
		case FAILURE:
			return { ...state, ...action.payload };
		case SUCCESS:
			return { ...state, ...action.payload };
		case UPDATE_SUCCESS:
			workspaceIndex = state.workspaces.findIndex(
				(w) => w.id === action.payload.workspace.id
			);

			if (workspaceIndex < 0) {
				return {
					...state,
					error: "Local update error: ID not found",
				};
			}

			return {
				...state,
				status: SUCCESS,
				workspaces: [
					...state.workspaces.slice(0, workspaceIndex),
					action.payload.workspace,
					...state.workspaces.slice(workspaceIndex + 1),
				],
			};
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
