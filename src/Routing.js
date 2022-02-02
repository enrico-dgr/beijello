import "./Routing.css";
/* react router */
import { Route, Routes } from "react-router-dom";
/* screens */
import Auth from "./screens/Auth";
import Board from "./screens/showBoard/Board";
import ChangePsw from "./screens/profile/ChangePsw";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/auth/Login";
import NotFound from "./screens/NotFound";
import Registration from "./screens/auth/Registration";
import { ToastContainer } from "react-toastify";
import Workspaces from "./screens/home/Workspaces";
/*  */
//REDUX
import { Provider } from "react-redux";
import applicationStore from "./applicationStore";

// SCREENS

function Routing() {
	return (
		<div className="App">
			<Provider store={applicationStore}>
				<Routes>
					<Route path="" element={<Home />}>
						<Route path="" element={<Workspaces />} />

						<Route
							path="board/:workspaceName/:boardName"
							element={<Board />}
						/>
						<Route
							path="profile/changepsw"
							element={<ChangePsw />}
						/>
					</Route>

					<Route path="auth" element={<Auth />}>
						<Route path="login" element={<Login />} />
						<Route
							path="registration"
							element={<Registration />}
						/>
						<Route
							path="forgotpassword"
							element={<ForgotPassword />}
						/>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Provider>
		</div>
	);
}

export default Routing;
