import "./Home.css";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { KEYS } from "../utils/localStorage";
import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { connect } from "react-redux";
import { getWorkspacesByUserId } from "../services/workspaceApi";
import { setIdle } from "../redux/ducks/userMeDuck";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import users from "../services/usersApi";

const mapStateToProps = (state) => ({
	user: state.userMeDuck.user,
});

const Home = (props) => {
	let navigate = useNavigate();
	let location = useLocation();

	const { t } = useTranslation();

	/* metodo di navigazione */
	const handleNavigate = (path) => () => {
		navigate(path);
	};

	/* log out */
	const handleSignOut = () => {
		localStorage.removeItem(KEYS.AUTH_TOKEN);
		props.dispatch(setIdle());
		navigate("/auth/login");
	};

	/**
	 * User data flow:
	 * - (1) token exists and there is no email saved
	 *  - check token
	 *  - if token is invalid, redirect to login
	 * - (2) token does not exist
	 *  - redirect to login
	 * - (3) user id exists
	 *  - load workspaces associated to user
	 *  - if loading fails, make a sandwich (whoops, a toast :D )
	 */
	useEffect(() => {
		const token = localStorage.getItem(KEYS.AUTH_TOKEN);

		if (token !== null && !props.user?.email) {
			// (1)
			users.authToken(token, props.dispatch).catch(() =>
				navigate("/auth/login")
			);
		} else if (token === null) {
			// (2)
			navigate("/auth/login");
		} else if (!!props.user?.id) {
			// (3)
			getWorkspacesByUserId(props.user.id, props.dispatch);
		}
	}, [props.user, props.dispatch, navigate]);

	return (
		<div className="home-container">
			<div className="navbar">
				<div className="navbar-left-item">
					<p
						onClick={handleNavigate("/")}
						className={`navbar-direct-workspaces ${
							location.pathname === "/"
								? "navbar-direct-selected"
								: "navbar-direct-unselected"
						}`}
					>
						BEIJELLO
					</p>
				</div>
				<div className="navbar-left-item">
					<p onClick={handleNavigate("/workspaces")}>
						BEIJELLO 3D
					</p>
				</div>
				<div
					style={{
						justifySelf: "flex-end",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<p onClick={handleSignOut}>{t("Home.Logout")}</p>
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
