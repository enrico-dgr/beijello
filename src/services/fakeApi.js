import { decryptText, encryptText } from "../utils/crypto";

/**
 * return array of registered users
 * or empty array if no user is registered
 * @return { User[] }
 */
const getUsers = () => {
	let encryptedUsers = localStorage.getItem("users");

	let users = [];

	if (encryptedUsers) {
		users = [...JSON.parse(decryptText(encryptedUsers))];
	}

	return users;
};

const findUserByEmail = (email) => {
	return getUsers().find((u) => u.email === email);
};

/**
 * set array of registered users
 */
const setUsers = (users) => {
	localStorage.setItem("users", encryptText(JSON.stringify(users)));
};

const addUser = (user) => {
	const users = getUsers();

	setUsers([...users, user]);
};

const signUp = ({
	name,
	surname,
	date,
	gender,
	phone,
	email,
	password,
	maritalStatus,
}) => {
	let user = {
		name: name,
		surname: surname,
		date: date,
		gender: gender,
		email: email,
		phone: phone,
		password: password,
		maritalStatus: maritalStatus,
	};

	let result = {
		errorMessage: "",
		emailUsed: false,
	};

	const users = getUsers();
	let dbUser = users.find((u) => u.email === email);

	if (dbUser) {
		result = {
			...result,
			errorMessage: "UsedEmail",
			emailUsed: true,
		};
	} else {
		// add user to db
		addUser(user);
		// add to local storage
		localStorage.setItem("session", encryptText(JSON.stringify(user)));

		return user;
	}

	return result;
};

const ADMIN_DATA = {
	name: "Adam",
	surname: "Admin",
	date: "01/01/0001",
	gender: "Other",
	phone: "1234567890",
	email: "admin@beije.it",
	password: "admin",
	maritalStatus: "SelfMarried",
};

const isAdmin = (email, password) =>
	email === ADMIN_DATA.email && password === ADMIN_DATA.password;

const usersFixture = [ADMIN_DATA];

const applyFixture = () => {
	let users = getUsers();
	const newUsers = users.filter((user) => {
		for (let i = 0; i < usersFixture.length; i++) {
			if (user.email === usersFixture[i].email) {
				return false;
			}
		}
		return true;
	});

	const dbUsers = [...newUsers, ...usersFixture];

	setUsers(dbUsers);

	return dbUsers;
};

const signIn = (email, password, remember) => {
	let res = {
		errorMsg: "",
		sessionUser: undefined,
	};

	if (isAdmin(email, password)) {
		res.sessionUser = ADMIN_DATA;
	} else {
		res.sessionUser = findUserByEmail(email);
	}

	if (
		res.sessionUser !== undefined &&
		res.sessionUser.password === password
	) {
		// don't save password in localstorage
		res.sessionUser.password = undefined;

		if (remember) {
			localStorage.setItem(
				"lastSession",
				encryptText(JSON.stringify({ email: email }))
			);
		} else {
			localStorage.removeItem("lastSession");
		}

		localStorage.setItem(
			"session",
			encryptText(JSON.stringify(res.sessionUser))
		);
	} else {
		res.sessionUser = undefined;
		res.errorMsg = "Wrong credential";
	}

	return res;
};

const signOut = () => {
	localStorage.removeItem("session");
};

const tryLocalSession = () => {
	let session = localStorage.getItem("session");

	if (session) {
		return JSON.parse(decryptText(session));
	} else {
		return false;
	}
};

const tryLastSession = () => {
	let session = localStorage.getItem("lastSession");

	if (session) {
		return JSON.parse(decryptText(session));
	} else {
		return false;
	}
};

const getUserPassword = (email) => {
	let user = findUserByEmail(email);

	if (user) {
		return user.password;
	} else {
		return false;
	}
};

export {
	signIn,
	signUp,
	signOut,
	tryLocalSession,
	tryLastSession,
	getUserPassword,
	applyFixture,
};
