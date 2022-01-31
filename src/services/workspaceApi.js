import { decryptText, encryptText } from "../utils/crypto";

const getWorkSpaces = () => {
	let encryptedWorkSpaces = localStorage.getItem("workSpaces");

	let workSpaces = [];

	if (encryptedWorkSpaces) {
		workSpaces = [...JSON.parse(decryptText(encryptedWorkSpaces))];
	}

	return workSpaces;
};

const getWorkSpacesByEmail = (email) => {
	let workSpacesByEmail = getWorkSpaces().filter((item) => {
		let flag = false;
		if (item.users.find((user) => user.email === email)) {
			flag = true;
		}
		return flag;
	});

	return workSpacesByEmail;
};

/* setting workSpaces */
const setWorkSpaces = (workSpaces) => {
	let encryptedWorkSpaces = encryptText(JSON.stringify(workSpaces));

	localStorage.setItem("workSpaces", encryptedWorkSpaces);
};

/* adding workSpaces */
const addWorkSpace = (workSpace) => {
	let decryptedWorkSpaces = getWorkSpaces();
	decryptedWorkSpaces.push(workSpace);
	setWorkSpaces(decryptedWorkSpaces);
};


export { getWorkSpaces, getWorkSpacesByEmail, setWorkSpaces, addWorkSpace };

