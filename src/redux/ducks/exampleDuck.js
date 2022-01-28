// Actions
const SET_CONFIG = 'web/config/SET_CONFIG'
const INIT_CONFIG = 'web/config/INIT_CONFIG'
const RUN = 'web/config/RUN'

// Action Creators
export function setConfig(value) {
	return {
		type: SET_CONFIG,
		payload: {
			config: value
		}
	};
}

// Action Creators
export function initConfig() {
	return {
		type: INIT_CONFIG,
		payload: {}
	}
}

// Action Creators
export function setRun(value) {
	return {
		type: RUN,
		payload: {
			run: value
		}
	}
}

const INIT_STATE = {
	config: {}
}

// Reducer
export default function configDuck(state = INIT_STATE, action) {
	switch (action.type) {
		case SET_CONFIG:
			var newState = Object.assign({}, state);
			newState.config = action.payload.config
			return newState;
		case RUN:
			var newState = Object.assign({}, state);
			newState.run = action.payload.run
			return newState;
		case INIT_CONFIG:
			var newState = Object.assign({}, state);
			newState.config = {}
			return newState;
		default:
			return state;
	}
}