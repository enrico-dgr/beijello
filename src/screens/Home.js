import "./Home.css";

import { Outlet, useNavigate } from "react-router-dom";
import { signOut, tryLocalSession } from "../services/fakeApi";

import { KEYS } from "../utils/localStorage";
import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { connect } from "react-redux";
import { getWorkSpacesByEmail } from "../services/workspaceApi";
import { setUser } from "../redux/ducks/userMeDuck";
import { setWorkspaces } from "../redux/ducks/workspacesDuck";
import { useEffect } from "react";
import users from "../services/users.service";

const mapStateToProps = (state) => ({
	user: state.userMeDuck.user,
});

const Home = (props) => {
	let navigate = useNavigate();

	const handleNavigate = (dest) => () => {
		navigate(dest);
	};

	const handleSignOut = () => {
		localStorage.removeItem(KEYS.AUTH_TOKEN);
		props.dispatch(setUser({}));
		navigate("/auth/login");
	};

	useEffect(() => {
		const token = localStorage.getItem(KEYS.AUTH_TOKEN);

		if (token !== null) {
			users.authToken(token).then((res) => {
				if (res.status === 200) {
					props.dispatch(setUser(res.data));
					props.dispatch(
						setWorkspaces(
							getWorkSpacesByEmail(res.data.email)
						)
					);
				} else {
					navigate("/auth/login");
				}
			});
		} else {
			navigate("/auth/login");
		}
	}, [props.user]);

	return (
		<div className="home-container">
			<div className="navbar">
				<p
					onClick={handleNavigate("/")}
					className="navbar-logotype"
				>
					BEIJE HOME
				</p>
				<div
					style={{
						justifySelf: "flex-end",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<p onClick={handleSignOut}>LOG OUT</p>
					<SwitchLanguage
						classNameContainer={
							"navbar__switch-language"
						}
					/>
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default connect(mapStateToProps)(Home);
