import { STATUS } from "../api";

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
	let workspaceIndex = -1;

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
		default:
			return state;
	}
}
