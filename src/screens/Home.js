import "./Home.css";

import { Outlet, useNavigate } from "react-router-dom";

import { KEYS } from "../utils/localStorage";
import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { connect } from "react-redux";
import { setIdle } from "../redux/ducks/userMeDuck";
import { toast } from "react-toastify";
import { useEffect } from "react";
import users from "../services/usersApi";
import workspaces from "../services/workspacesApi";

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
		props.dispatch(setIdle());
		navigate("/auth/login");
	};

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
