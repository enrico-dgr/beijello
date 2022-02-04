import "./Routing.css";

/* react router */
import { Route, Routes } from "react-router-dom";

/* screens */
import Auth from "./screens/Auth";
import Board from "./screens/home/Board";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/auth/Login";
import NotFound from "./screens/NotFound";
import { Provider } from "react-redux";
import Registration from "./screens/auth/Registration";
import Workspaces from "./screens/home/Workspaces";
import Workspaces3D from "./screens/home/Workspaces3D";
import applicationStore from "./applicationStore";

function Routing(props) {
	return (
		<div className="App">
			<Provider store={applicationStore}>
				<Routes>
					<Route path="" element={<Home />}>
						<Route path="" element={<Workspaces />} />
						<Route
							path="/3D"
							element={<Workspaces3D />}
						/>

						<Route
							path="board/:workspaceName/:workspaceId/:boardName/:boardId"
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
