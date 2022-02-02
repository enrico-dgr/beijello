import "./Auth.css";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import SwitchLanguage from "../components/funcComponents/SwitchLanguage";

const Auth = () => {
	let { pathname } = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		let path = pathname.replace("/", "");

		if (path === "auth" || path === "auth/") {
			navigate("/auth/login");
		}
	}, []);

	return (
		<div className="limiter">
			<div className="auth-container">
				<div className="auth-wrapper">
					<SwitchLanguage
						classNameContainer={"auth__select-language"}
					/>

					<Outlet />

					<div className="auth-bg-image"></div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
