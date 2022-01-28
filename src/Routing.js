import "./Routing.css";

import { Route, Routes } from "react-router-dom";
import Workspaces from "./screens/home/workspaces/Workspaces";
import Auth from "./screens/Auth";
import ChangePsw from "./screens/profile/ChangePsw";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/auth/Login";
import NotFound from "./screens/NotFound";
import Registration from "./screens/auth/Registration";
// SCREENS
import Welcome from "./screens/home/Welcome";
//REDUX
import applicationStore from './applicationStore';
import { Provider } from 'react-redux';

function Routing() {
	return (
		<div className="App">
			<Provider store={applicationStore}>
				<Routes>
					<Route path="" element={<Home />}>
						<Route path="" element={<Workspaces />} />
						{/* <Route path="" element={<Welcome />} /> */}

						{/*<Route path="board" element={<Board />}/> */}
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
