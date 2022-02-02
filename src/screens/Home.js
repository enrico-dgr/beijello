import "./Home.css";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { signOut, tryLocalSession } from "../services/fakeApi";

import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { connect } from "react-redux";
import { getWorkSpacesByEmail } from "../services/workspaceApi";
import { setUser } from "../redux/ducks/userMeDuck";
import { setWorkspaces } from "../redux/ducks/workspacesDuck";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
	user: state.userMeDuck.user,
});

const Home = (props) => {
	let navigate = useNavigate();
	let location = useLocation()

	console.log("location", location);
	const { t } = useTranslation();


	/* metodo di navigazione */
	const handleNavigate = (path) => () => {
		navigate(path);
	};

	/* log out */
	const handleSignOut = () => {
		signOut();
		navigate("/auth/login");
	};

	/* component did update con dipendenza props.user */
	useEffect(() => {
		let localSession = tryLocalSession();

		if (!localSession) {
			navigate("/auth/login");
		} else if (localSession && !props.user.email) {
			props.dispatch(setUser(localSession));
		}

		if (props.user.email !== undefined) {
			props.dispatch(
				setWorkspaces(getWorkSpacesByEmail(props.user.email))
			);
		}
	}, [props.user]);

	return (
		<div className="home-container">
			<div className="navbar">
				<div className="navbar-left-item">
					<p
						onClick={handleNavigate("/")}
						className="navbar-logotype"
					>
						BEIJELLO
					</p>
					<p
						onClick={handleNavigate("/")}
						className={`navbar-direct-workspaces ${(location.pathname === "/") ? "navbar-direct-selected" : "navbar-direct-unselected"}`}
					>
						Workspaces
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
