import { decryptText, encryptText } from "../utils/crypto";

const getWorkSpaces = () => {
	let encryptedWorkSpaces = localStorage.getItem("workSpaces");

	let workSpaces = [];

	if (encryptedWorkSpaces) {
		workSpaces = JSON.parse(decryptText(encryptedWorkSpaces));
	}

	return workSpaces;
};

const getWorkSpacesByEmail = (email) => {
	let workSpacesByEmail = getWorkSpaces().filter((workspace) => {
		let flag = false;
		if (workspace.users.find((user) => user.email === email)) {
			flag = true;
		}
		return flag;
	});

	return workSpacesByEmail;
};

/* setting workSpaces */
const setWorkSpaces = (workSpaces) => {
	let encryptedWorkSpaces = encryptText(JSON.stringify(workSpaces));

	localStorage.setItem("workSpacesDecrypted", JSON.stringify(workSpaces));
	localStorage.setItem("workSpaces", encryptedWorkSpaces);
};

/* adding workSpaces */
const addWorkSpace = (workSpace) => {
	let decryptedWorkSpaces = getWorkSpaces();
	decryptedWorkSpaces.push(workSpace);
	setWorkSpaces(decryptedWorkSpaces);
};

const updateWorkspace = (workspace, workspaceName, email) => {
	let workspaces = getWorkSpacesByEmail(email);
	const index = workspaces.findIndex((w) => w.name === workspaceName);

	if (index > -1) {
		workspaces[index] = workspace;
	}
};

export {
	getWorkSpaces,
	getWorkSpacesByEmail,
	setWorkSpaces,
	addWorkSpace,
	updateWorkspace,
};
