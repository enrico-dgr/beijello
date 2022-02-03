import { STATUS } from "../api";

const IDLE = "web/userMe/" + STATUS.IDLE;
const LOADING = "web/userMe/" + STATUS.LOADING;
const FAILURE = "web/userMe/" + STATUS.FAILURE;
const SUCCESS = "web/userMe/" + STATUS.SUCCESS;

/**
 * Reset all data to default
 */
export const setIdle = () => ({
	type: IDLE,
	payload: {
		error: "",
		status: STATUS.IDLE,
		user: {},
	},
});

/**
 * Only update status
 */
export const setLoading = () => ({
	type: LOADING,
	payload: {
		status: STATUS.LOADING,
	},
});

/**
 * Update status and add an error message
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
 * Set user data, update status and reset error
 * @param { {
 *  id: number;
 *  email: string;
 *  name: string;
 *  surname: string;
 *  date: string;
 *  gender: string;
 *  phone: number;
 *  email: string;
 *  maritalStatus: string;
 * } } user id and email at the moment
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
