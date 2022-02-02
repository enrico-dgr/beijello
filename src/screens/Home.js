import "./Home.css";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { KEYS } from "../utils/localStorage";
import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { connect } from "react-redux";
import { setIdle } from "../redux/ducks/userMeDuck";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import users from "../services/usersApi";
import workspaces from "../services/workspacesApi";

const mapStateToProps = (state) => ({
	user: state.userMeDuck.user,
});

const Home = (props) => {
	let navigate = useNavigate();
	let location = useLocation();

	console.log("location", location);
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

	/* component did update con dipendenza props.user */
	useEffect(() => {
		const token = localStorage.getItem(KEYS.AUTH_TOKEN);

		if (token !== null && !props.user?.email) {
			users.authToken(token, props.dispatch).catch(() =>
				navigate("/auth/login")
			);
		} else if (token === null) {
			navigate("/auth/login");
		} else if (!!props.user.id) {
			workspaces
				.getByUserId(props.user.id, props.dispatch)
				.catch((err) => {
					toast.error(err, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				});
		}
	});

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
						className={`navbar-direct-workspaces ${
							location.pathname === "/"
								? "navbar-direct-selected"
								: "navbar-direct-unselected"
						}`}
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
