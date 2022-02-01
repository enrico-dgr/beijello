import "./Home.css";

import { Outlet, useNavigate } from "react-router-dom";
import { signOut, tryLocalSession } from "../services/fakeApi";

import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { connect } from "react-redux";
import { getWorkSpacesByEmail } from "../services/workspaceApi";
import { setUser } from "../redux/ducks/userMeDuck";
import { setWorkspaces } from "../redux/ducks/workspacesDuck";
import { useEffect } from "react";

const mapStateToProps = (state) => ({
	user: state.userMeDuck.user,
});

const Home = (props) => {
	let navigate = useNavigate();

	/* metodo di navigazione */
	const handleNavigate = (dest) => () => {
		navigate(dest);
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
				<p
					onClick={handleNavigate("/")}
					className="navbar-logotype"
				>
					BEIJELLO
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
