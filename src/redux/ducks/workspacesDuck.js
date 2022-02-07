import { STATUS } from "../api";

const ACTIONS = {
	GET: "web/workspaces/get/",
	CREATE: "web/workspaces/create/",
	UPDATE: "web/workspaces/update/",
	DELETE: "web/workspaces/delete/",
};

const IDLE = "web/workspaces/" + STATUS.IDLE;
const LOADING = "web/workspaces/" + STATUS.LOADING;
const FAILURE = "web/workspaces/" + STATUS.FAILURE;
const SUCCESS = "web/workspaces/" + STATUS.SUCCESS;

export const setIdle = () => ({
	type: IDLE,
	payload: {},
});

export const setLoading = () => ({
	type: LOADING,
	payload: {},
});

/**
 *
 * @param {string} errorMessage
 */
export const setFailure = (errorMessage) => ({
	type: FAILURE,
	payload: {
		error: errorMessage,
	},
});

/**
 * @deprecated use `setSuccessGet`
 */
export const setSuccess = (workspaces) => ({
	type: SUCCESS,
	payload: {
		workspaces,
	},
});

export const setSuccessGet = (workspaces) => ({
	type: ACTIONS.GET + STATUS.SUCCESS,
	payload: {
		workspaces,
	},
});

export const setSuccessCreate = (workspace) => ({
	type: ACTIONS.CREATE + STATUS.SUCCESS,
	payload: {
		workspace,
	},
});

export const setSuccessUpdate = (workspace) => ({
	type: ACTIONS.UPDATE + STATUS.SUCCESS,
	payload: {
		workspace,
	},
});

export const setSuccessDelete = (workspaceId) => ({
	type: ACTIONS.DELETE + STATUS.SUCCESS,
	payload: {
		workspaceId,
	},
});

const INIT_STATE = {
	error: "",
	status: STATUS.IDLE,
	workspaces: [],
};

// Reducer
export default function workspaceDuck(state = INIT_STATE, action) {
	let workspaceIndex = -1;

	switch (action.type) {
		case IDLE:
			return {
				...state,
				error: "",
				status: STATUS.IDLE,
				workspaces: [],
			};
		case LOADING:
			return { ...state, status: STATUS.LOADING };
		case FAILURE:
			return {
				...state,
				error: action.payload.error,
				status: STATUS.FAILURE,
			};
		case SUCCESS:
			return {
				...state,
				status: STATUS.SUCCESS,
				workspaces: action.payload.workspaces,
			};
		case ACTIONS.GET + STATUS.SUCCESS:
			return {
				...state,
				status: STATUS.SUCCESS,
				workspaces: action.payload.workspaces,
			};
		case ACTIONS.CREATE + STATUS.SUCCESS:
			return {
				...state,
				status: STATUS.SUCCESS,
				workspaces: [
					...state.workspaces,
					action.payload.workspace,
				],
			};
		case ACTIONS.UPDATE + STATUS.SUCCESS:
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
				status: STATUS.SUCCESS,
				workspaces: [
					...state.workspaces.slice(0, workspaceIndex),
					action.payload.workspace,
					...state.workspaces.slice(workspaceIndex + 1),
				],
			};

		case ACTIONS.DELETE + STATUS.SUCCESS:
			return {
				...state,
				status: STATUS.SUCCESS,
				workspaces: state.workspaces.filter(
					(w) => w.id !== action.payload.workspaceId
				),
			};

		default:
			return state;
	}
}
