import { STATUS } from "../api";

const IDLE = "web/userMe/" + STATUS.IDLE;
const LOADING = "web/userMe/" + STATUS.LOADING;
const FAILURE = "web/userMe/" + STATUS.FAILURE;
const SUCCESS = "web/userMe/" + STATUS.SUCCESS;

export const setIdle = () => ({
	type: IDLE,
	payload: {
		error: "",
		status: STATUS.IDLE,
		user: {},
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

/**
 *
 * @param { {
 *  id: number;
 *  email: string;
 * } } user
 * @returns
 */
export const setSuccess = (user) => ({
	type: SUCCESS,
	payload: {
		error: "",
		status: STATUS.SUCCESS,
		user,
	},
});

const INIT_STATE = {
	error: "",
	status: STATUS.IDLE,
	user: {},
};

export default function userMeDuck(state = INIT_STATE, action) {
	switch (action.type) {
		case IDLE:
			return { ...action.payload };
		case LOADING:
			return { ...action.payload };
		case FAILURE:
			return { ...action.payload };
		case SUCCESS:
			return { ...action.payload };
		default:
			return state;
	}
}
