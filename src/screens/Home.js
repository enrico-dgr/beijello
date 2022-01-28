import "./Home.css";
import React from "react";
import { applyFixture } from "../services/fakeApi";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/* redux */
import { connect } from "react-redux";
import { setUser } from "../redux/ducks/userMeDuck";
/* i18next */
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
/* Home screens */
import Workspaces from "./home/workspaces/Workspaces";
/* services : fakeApi */
import { signOut, tryLocalSession } from "../services/fakeApi";




// COMPONENT

// SERVICES

const Home = (props) => {
	let navigate = useNavigate();
	const handleNavigate = (dest) => () => {
		navigate(dest);
	};
	const handleSignOut = () => {
		signOut();
		navigate("/auth/login");
	};

	let [session, setSession] = useState()

	useEffect(() => {


		let localSession = tryLocalSession();

		if (!localSession) {
			navigate('/auth/login')
		} else if (localSession && !session) {
			props.dispatch(setUser(localSession))
		}
	}, [session]);
	/* Component did mount */



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

export default connect()(Home);
