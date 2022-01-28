import { combineReducers } from "redux";
import userMeDuck from "../ducks/userMeDuck";
import workspacesDuck from "../ducks/workspacesDuck";

//API

//DUCK
// import exampleDuck from '../ducks/exampleDuck'

const rootReducer = combineReducers({
	// exampleDuck,
	userMeDuck,
	workspacesDuck,
});

export default rootReducer;
