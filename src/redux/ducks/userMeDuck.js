// Actions
const SET_USER = "web/userMe/SET_USER";

// Action Creators
export function setUser(user) {
	return {
		type: SET_USER,
		payload: {
			user,
		},
	};
}

const INIT_STATE = {
	user: {},
};

// Reducer
export default function userMeDuck(state = INIT_STATE, action) {
	switch (action.type) {
		case SET_USER:
			var newState = Object.assign({}, state);
			newState.user = action.payload.user;
			return newState;
		default:
			return state;
	}
}
