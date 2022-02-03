// CSS
import "./Login.css";

import React, { Component } from "react";

import Checkbox from "../../components/funcComponents/UI/checkbox/Checkbox";
import CircleButton from "../../components/funcComponents/CircleButton";
// FUNC COMPONENTS
import Input from "../../components/funcComponents/UI/input/Input";
import { Navigate } from "react-router-dom";
import SubmitButton from "../../components/funcComponents/SubmitButton";
import { checkEmail } from "../../utils/utils";
import { connect } from "react-redux";
// IMAGES
import facebook from "../../assets/images/facebook-to-zindex.png";
import { getRemember } from "../../utils/localStorage";
import { toast } from "react-toastify";
import twitter from "../../assets/images/twitter-to-zindex.png";
import users from "../../services/usersApi";
import { withTranslation } from "react-i18next";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: "",
			email: "",
			emailError: false,
			passwordError: false,
			rememberSession: true,
			path: "none",
		};
	}

	componentDidMount() {
		const remember = getRemember();

		if (!!this.props.user?.email) {
			this.setState({ path: "/" });
		} else if (remember) {
			this.setState({ email: remember.email });
		}
	}

	checkLogin = () => {
		let emailInput = this.state.email;
		let passwordInput = this.state.password;
		let passwordError = false;
		let emailError = false;
		if (!checkEmail(emailInput)) {
			emailError = true;
		}

		if (passwordInput.trim() === "") {
			passwordError = true;
		}

		this.setState({
			emailError,
			passwordError,
		});

		if (!emailError && !passwordError) {
			users.login(
				{
					email: this.state.email,
					password: this.state.password,
				},
				this.state.rememberSession,
				this.props.dispatch
			)
				.then(() => this.setState({ path: "/" }))
				.catch((err) =>
					toast.error(err.message, {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
				);
		}
	};

	onClickForgotPassword = (e) => {
		e.preventDefault();
		this.setState({ path: "/auth/forgotpassword" });
	};

	onSignUpClick = () => {
		this.setState({ path: "/auth/registration" });
	};

	onClickCheckbox = () => {
		this.setState({ rememberSession: !this.state.rememberSession });
	};

	setEmail = (e) => {
		this.setState({ email: e.target.value });
	};

	setPassword = (e) => {
		this.setState({ password: e.target.value });
	};

	render() {
		const { t } = this.props;

		return (
			<div className="auth-default-form">
				{this.state.path !== "none" && (
					<Navigate to={this.state.path} />
				)}
				<h1 className="title">{t("Login.Title")}</h1>
				<Input
					label="Email"
					value={this.state.email}
					type="text"
					onChangeCallback={this.setEmail}
					errorFlag={this.state.emailError}
					errorText={t("Login.EmailError")}
				/>

				<Input
					type="password"
					label="Password"
					value={this.state.password}
					onChangeCallback={this.setPassword}
					errorFlag={this.state.passwordError}
					errorText={t("Login.PasswordError")}
				/>

				<div className="user-actions-container">
					<Checkbox
						label={t("Login.RememberMe")}
						checkboxStyleContainer="checkbox"
						checkboxStyleInput="input-checkbox"
						checkboxStyleLabel="label"
						callback={this.onClickCheckbox}
						value={this.state.rememberSession}
					/>

					<a
						href="//"
						className={"link"}
						onClick={this.onClickForgotPassword}
					>
						{t("Login.ForgotPassword")}
					</a>
				</div>
				<SubmitButton
					label={t("Login.SubmitButton")}
					onClick={this.checkLogin}
				/>
				<div className="goto-sign goto-sign--up">
					<span
						style={{ cursor: "pointer" }}
						onClick={this.onSignUpClick}
					>
						{t("Login.SignUp")}
					</span>
				</div>
				<div className="sign-up">
					<span style={{ cursor: "pointer" }}>
						{t("Login.OrSignUpWith")}
					</span>
				</div>
				<div>
					<CircleButton className={"facebook"}>
						<img
							src={facebook}
							className="img-facebook"
							alt="facebook-icon"
						/>
					</CircleButton>
					<CircleButton className={"twitter"}>
						<img
							src={twitter}
							className="img-twitter"
							alt="twitter-icon"
						/>
					</CircleButton>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.userMeDuck.user,
});

export default connect(mapStateToProps)(withTranslation()(Login));
