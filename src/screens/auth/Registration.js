import "./Registration.css";

import React, { useState } from "react";
import {
	capitalizeFirstLetter,
	checkEmail,
	checkPassword,
	isEmpty,
} from "../../utils/utils";

import Input from "../../components/funcComponents/UI/input/Input";
import { KEYS } from "../../utils/localStorage";
import SubmitButton from "../../components/funcComponents/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import users from "../../services/usersApi";

const Registration = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [state, setState] = useState({
		user: {
			name: "",
			surname: "",
			date: "",
			gender: "Male",
			email: "",
			password: "",
			phone: "",
			maritalStatus: "single",
		},
		error: {
			name: false,
			surname: false,
			date: false,
			gender: false,
			email: false,
			password: false,
			phone: false,
			maritalStatus: false,
		},
		errorI18n: {
			name: "",
			surname: "",
			date: "",
			gender: "",
			email: "",
			password: "",
			phone: "",
			maritalStatus: "",
		},
	});

	const onSignUpClick = () => {
		navigate("/auth/login");
	};

	const setUser = (user) => {
		let newUserState = state.user;
		for (const key in user) {
			if (
				Object.hasOwnProperty.call(user, key) &&
				Object.hasOwnProperty.call(newUserState, key)
			) {
				newUserState[key] = user[key];
			}
		}

		setState({ ...state, user: newUserState });
	};

	const setName = (e) => {
		setUser({ name: e.target.value });
	};
	const setSurname = (e) => {
		setUser({ surname: e.target.value });
	};
	const setGender = (e) => {
		setUser({ gender: e.target.value });
	};
	const setDate = (e) => {
		setUser({ date: e.target.value });
	};
	const setPhone = (e) => {
		setUser({ phone: e.target.value });
	};
	const setEmail = (e) => {
		setUser({ email: e.target.value });
	};
	const setPassword = (e) => {
		setUser({ password: e.target.value });
	};
	const handleChange = (e) => {
		setUser({ maritalStatus: e.target.value });
	};
	const handleClick = () => {
		checkReg();
	};

	const checkReg = async () => {
		let user = Object.assign(state.user);
		let error = Object.assign(state.error);
		let errorI18n = Object.assign(state.errorI18n);
		let isThereAnyError = false;

		// check every empty input
		for (const key in user) {
			if (Object.hasOwnProperty.call(user, key)) {
				if (isEmpty(user[key])) {
					error[key] = true;
					errorI18n[key] = `Empty${capitalizeFirstLetter(
						key
					)}`;
					isThereAnyError = true;
				} else {
					error[key] = false;
				}
			}
		}

		if (!error.email && !checkEmail(user.email)) {
			error.email = true;
			isThereAnyError = true;
			errorI18n.email = "InvalidEmail";
		}

		if (!error.password && !checkPassword(user.password)) {
			error.password = true;
			console.log("pass err");
			isThereAnyError = true;
			errorI18n.password = "InvalidPassword";
		}

		if (!isThereAnyError) {
			const res = await users.register({
				name: state.user.name,
				surname: state.user.surname,
				date: state.user.date,
				gender: state.user.gender,
				phone: state.user.phone,
				email: state.user.email,
				password: state.user.password,
				maritalStatus: state.user.maritalStatus,
			});

			if (res.status === 409) {
				errorI18n.email = "UsedEmail";
				error.email = true;
			}

			if (res.status === 201) {
				localStorage.setItem(KEYS.AUTH_TOKEN, res.token);
				navigate("/");
			}
		}

		setState({
			...state,
			user,
			error,
			errorI18n,
		});
	};

	return (
		<div className="auth-default-form auth-signup-form">
			<h1 className="title">{t("Registration.Title")}</h1>
			<div className="goto-sign goto-sign--in">
				<span
					style={{ cursor: "pointer" }}
					onClick={onSignUpClick}
				>
					{t("Registration.SignIn")}
				</span>
			</div>
			<Input
				height={60}
				className="name"
				label={t("Registration.Name")}
				type="text"
				value={state.user.name}
				onChangeCallback={setName}
				errorFlag={state.error.name}
				errorText={t("Registration.NameError")}
			/>
			<Input
				height={60}
				className="surname"
				label={t("Registration.Surname")}
				type="text"
				value={state.user.surname}
				onChangeCallback={setSurname}
				errorFlag={state.error.surname}
				errorText={t("Registration.SurnameError")}
			/>
			<div className="reg-gender" onChange={setGender}>
				<input
					label=""
					type="radio"
					value="Male"
					name="gender"
					defaultChecked
				/>
				{t("Registration.Gender.Male")}
				<input
					label=""
					type="radio"
					value="Female"
					name="gender"
				/>
				{t("Registration.Gender.Female")}
				<input
					label=""
					type="radio"
					value="Other"
					name="gender"
				/>
				{t("Registration.Gender.Other")}
			</div>
			<Input
				height={60}
				className={`birth-date ${
					state.user.date === "" ? "" : "birth-date--filled"
				}`}
				label="Birth date"
				type="date"
				value={state.user.date}
				onChangeCallback={setDate}
				errorFlag={state.error.date}
				errorText={t("Registration.DateError")}
			/>
			<Input
				height={60}
				className="telefono"
				label={t("Registration.PhoneNumber")}
				type="number"
				value={state.user.phone}
				onChangeCallback={setPhone}
				errorFlag={state.error.phone}
				errorText={t("Registration.PhoneNumberError")}
			/>
			<Input
				height={60}
				label="Email"
				type="email"
				value={state.user.email}
				onChangeCallback={setEmail}
				errorFlag={state.error.email}
				errorText={t(
					`Registration.EmailErrors.${state.errorI18n.email}`
				)}
			/>
			<Input
				height={60}
				label="Password"
				type="password"
				value={state.user.password}
				onChangeCallback={setPassword}
				errorFlag={state.error.password}
				errorText={t(
					`Registration.PasswordErrors.${state.errorI18n.password}`
				)}
			/>
			<div className="form-marital-status">
				<label>
					{t("Registration.MaritalStatus.Name")}
					<select value={"single"} onChange={handleChange}>
						<option value="single">
							{t(
								"Registration.MaritalStatus.Single"
							)}
						</option>
						<option value="married">
							{t(
								"Registration.MaritalStatus.Married"
							)}
						</option>
						<option value="divorced">
							{t(
								"Registration.MaritalStatus.Divorced"
							)}
						</option>
						<option value="self-married">
							{t(
								"Registration.MaritalStatus.SelfMarried"
							)}
						</option>
					</select>
				</label>
			</div>
			<SubmitButton
				label={t("Registration.SubmitButton")}
				onClick={handleClick}
			/>
		</div>
	);
};

export default Registration;
