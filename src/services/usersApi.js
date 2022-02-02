import { decryptText, encryptText } from "../utils/crypto";
import { setFailure, setLoading, setSuccess } from "../redux/ducks/userMeDuck";

import { KEYS } from "../utils/localStorage";
import axios from "axios";

const users = axios.create({
	baseURL: "http://localhost:3308/users",
});

// -----------
// METHODS
// -----------

// -----------
// **GET**
// -----------
/**
 * @private
 * @returns array of users with all data except password
 * Note: empty array if none is found
 */
const getFullUsersByEmail = (email) => users.get(`?email=${email}`);

/**
 * @returns array of users with all data except password
 * Note: empty array if none is found
 */
const getUsersByEmail = (email) =>
	users.get(`?email=${email}`).then((res) =>
		// 200 OK
		({
			// no passwords should be available to client
			...res,
			data: res.data.map((u) => ({ ...u, password: undefined })),
		})
	);

/**
 * verify token and set user data on success
 */
const authToken = async (token, dispatch) => {
	dispatch(setLoading());

	const res = await users.get(
		`?email=${JSON.parse(decryptText(token)).email}`
	);

	if (res.status === 200) {
		dispatch(
			setSuccess({
				...res.data[0],
				password: undefined,
			})
		);
	} else {
		dispatch(setFailure());
		throw new Error(res.statusText);
	}
};

// -----------
// **POST**
// -----------

/**
 *
 * @returns Possibilities:
 * - `res.status` is `201` on success, along with `token` and `data`
 * - `res.status` is `409` on email already used
 * - others...
 */
const register = async (user) => {
	// default response
	let res = {
		data: {},
		status: 0,
		statusText: "Default axios response",
	};

	// back-end data validation omitted,
	// but registration form does some validation data

	// back-end checks if email is already used
	const resByEmail = await getUsersByEmail(user.email);

	if (resByEmail.status !== 200) {
		res.status = resByEmail.status;
		res.statusText = resByEmail.statusText;
		return res;
	} else if (resByEmail.data.length > 0) {
		res.status = 409;
		res.statusText = "UsedEmail";
	} else {
		// register user
		const resOfRegistration = await users.post(
			"/",
			// encrypt pass
			{ ...user, password: encryptText(user.password) },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (resOfRegistration.status !== 201) {
			res.status = resByEmail.status;
			res.statusText = resByEmail.statusText;
		} else {
			const data = {
				...resOfRegistration.data,
				password: undefined,
			};

			res = {
				data,
				status: resOfRegistration.status,
				statusText: resOfRegistration.statusText,
				// not a real token, just encrypted data,
				// back-end should give you this ready to store
				token: encryptText(JSON.stringify(data)),
			};
		}
	}

	return res;
};

/**
 * `res.status` is `200` on success
 */
const login = async (user, remember, dispatch) => {
	let error = "";

	// simulate request sent to back-end
	dispatch(setLoading());

	// back-end data validation omitted,
	// but registration form does some validation data

	// back-end checks if email is already used
	const resByEmail = await getFullUsersByEmail(user.email);

	if (resByEmail.status !== 200) {
		error =
			resByEmail.statusText !== ""
				? resByEmail.statusText
				: "Unknown error";
	} else if (resByEmail.data.length > 1) {
		error = "Multiple email found";
	} else if (resByEmail.data.length === 0) {
		error = "Wrong credential";
	} else if (decryptText(resByEmail.data[0].password) !== user.password) {
		error = "Wrong credential";
	}

	// dispatch result
	if (error !== "") {
		dispatch(setFailure(error));
		throw new Error(error);
	} else {
		const data = { ...resByEmail.data[0], password: undefined };

		dispatch(setSuccess(data));

		if (remember) {
			localStorage.setItem(
				KEYS.REMEMBER,
				encryptText(JSON.stringify({ email: data.email }))
			);
		}

		// not a real token, just encrypted data,
		// back-end should give you this ready to store
		localStorage.setItem(
			KEYS.AUTH_TOKEN,
			encryptText(JSON.stringify(data))
		);
	}
};

const toExport = {
	authToken,
	getUsersByEmail,
	login,
	register,
};

export default toExport;
