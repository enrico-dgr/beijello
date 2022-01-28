import "./Home.css";

import { Outlet, useNavigate } from "react-router-dom";

import React from "react";
import SwitchLanguage from "../components/funcComponents/SwitchLanguage";
import { signOut } from "../services/fakeApi";

// COMPONENT

// SERVICES

const Home = () => {
	let navigate = useNavigate();

	const handleSignOut = () => {
		signOut();
		navigate("/auth/login");
	};

	const handleNavigate = (dest) => () => {
		navigate(dest);
	};

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

export default Home;
