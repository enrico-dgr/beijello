import "./Routing.css";

/* react router */
import { Route, Routes } from "react-router-dom";

/* screens */
import Auth from "./screens/Auth";
import Board from "./screens/showBoard/Board";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/auth/Login";
import NotFound from "./screens/NotFound";
import { Provider } from "react-redux";
import Registration from "./screens/auth/Registration";
import Workspaces from "./screens/home/Workspaces";
import applicationStore from "./applicationStore";

function Routing(props) {
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
