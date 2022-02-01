import { decryptText, encryptText } from "../utils/crypto";

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
 *
 * @returns Possibilities:
 * - `res.status` is `200` on auth, along with `data`
 * - `res.status` is `401` on invalid token, need to login
 */
const authToken = (token) =>
	users.get(`?email=${JSON.parse(decryptText(token)).email}`).then((res) =>
		res.data.length === 1
			? {
					status: 200,
					// no passwords should be available to client
					data: {
						...res.data[0],
						password: undefined,
					},
			  }
			: {
					status: 401,
			  }
	);

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
const login = async (user, remember) => {
	// default response
	let res = {
		data: {},
		status: 0,
		statusText: "Default axios response",
	};

	// back-end data validation omitted,
	// but registration form does some validation data

	// back-end checks if email is already used
	const resByEmail = await getFullUsersByEmail(user.email);

	if (resByEmail.status !== 200) {
		res.status = resByEmail.status;
		res.statusText = resByEmail.statusText;
	} else if (resByEmail.data.length > 1) {
		res.status = 500;
		res.statusText = "Multiple email found";
	} else if (resByEmail.data.length === 0) {
		res.status = 400;
		res.statusText = "Wrong credential";
	} else if (decryptText(resByEmail.data[0].password) !== user.password) {
		res.status = 400;
		res.statusText = "Wrong credential";
	} else {
		const data = { ...resByEmail.data[0], password: undefined };

		if (remember) {
			localStorage.setItem(
				KEYS.REMEMBER,
				encryptText(JSON.stringify({ email: data.email }))
			);
		}

		res = {
			data,
			status: 200,
			statusText: resByEmail.statusText,
			// not a real token, just encrypted data,
			// back-end should give you this ready to store
			token: encryptText(JSON.stringify(data)),
		};
	}

	return res;
};

const toExport = {
	authToken,
	getUsersByEmail,
	login,
	register,
};

export default toExport;
