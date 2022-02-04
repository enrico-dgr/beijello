import {
	setFailure,
	setLoading,
	setSuccess,
	setSuccessDelete,
	setSuccessUpdate,
} from "../redux/ducks/workspacesDuck";

import axios from "axios";

const workspaces = axios.create({
	baseURL: "http://localhost:3308",
});

// -----------
// METHODS
// -----------

// -----------
// **GET**
// -----------

/**
 * @returns array of workspaces with boards previews
 * Note: empty array if none is found
 */
const getByUserId = async (userId, dispatch) => {
	dispatch(setLoading());

	const resByUserId = await workspaces.get(
		`/workspaceUsers?userId=${userId}&_expand=workspace`
	);

	if (resByUserId.status !== 200) {
		dispatch(setFailure(resByUserId.statusText));
		throw new Error(resByUserId.statusText);
	}

	dispatch(setSuccess(resByUserId.data.map((wU) => wU.workspace)));
};

const getRelations = async (workspaceId) => {
	const resByWorkspaceId = await workspaces.get(
		`/workspaceUsers?workspaceId=${workspaceId}&_expand=user`
	);

	if (resByWorkspaceId.status !== 200) {
		throw new Error(resByWorkspaceId.statusText);
	}

	return resByWorkspaceId.data.map((r) => ({
		...r,
		user: {
			id: r.user.id,
			email: r.user.email,
			fullName: `${r.user.name} ${r.user.surname}`,
		},
	}));
};

// -----------
// **POST**
// -----------

/* adding collaborator */
const addCollaborator = async (workspaceId, userId) => {
	const resRelations = await workspaces.get(
		`/workspaceUsers?workspaceId=${workspaceId}&userId=${userId}`
	);

	if (resRelations.status !== 200) {
		throw new Error(resRelations.statusText);
	} else if (resRelations.data.length > 0) {
		throw new Error("User has already permissions");
	}

	const resCreateRelations = await workspaces.post(`/workspaceUsers`, {
		userId,
		workspaceId,
		role: "collaborator",
	});

	if (resCreateRelations.status !== 201) {
		throw new Error(resCreateRelations.statusText);
	}
};

/* adding workSpaces */
const create = async ({ name }, userId, dispatch) => {
	if (!name || !userId) {
		throw Error("Data missing");
	}

	// try to create workspace
	const resCreateWorkspace = await workspaces.post(
		`/workspaces`,
		{
			name,
			boards: [],
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (resCreateWorkspace.status !== 201) {
		throw new Error(resCreateWorkspace.statusText);
	}

	// try to create workspace-user relation
	const resCreateRelations = await workspaces.post(`/workspaceUsers`, {
		userId: userId,
		workspaceId: resCreateWorkspace.data.id,
		role: "admin",
	});

	// return errors on relation and delete workspace
	if (resCreateRelations.status !== 201) {
		deleteById(resCreateWorkspace.data.id);
		throw new Error(resCreateWorkspace.statusText);
	}

	return getByUserId(userId, dispatch);
};

// -----------
// **PUT**
// -----------
const update = async (workspace, userId, dispatch) => {
	dispatch(setLoading());
	let error = "";
	const resPermission = await workspaces.get(
		`/workspaceUsers?userId=${userId}&workspaceId=${workspace.id}`
	);

	if (resPermission.status !== 200) {
		error = "Server error, retry later";
	} else if (resPermission.data.length < 1) {
		error = "No authorization to edit this workspace";
	} else if (
		resPermission.data[0].role !== "admin" &&
		resPermission.data[0].role !== "collaborator"
	) {
		error = "Authorization is not enough to edit this workspace";
	}

	if (error !== "") {
		dispatch(setFailure(error));
		throw new Error(error);
	}

	// try to update
	const res = await workspaces.put(
		`/workspaces/${workspace.id}`,
		workspace,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (res.status !== 200) {
		dispatch(setFailure("Server error while updating"));
		throw new Error(error);
	} else {
		dispatch(setSuccessUpdate(res.data));
	}
};

// -----------
// **DELETE**
// -----------

const deleteById = async (workspaceId, dispatch) => {
	const res = await workspaces.delete(`/workspaces/${workspaceId}`);

	if (res.status !== 200) {
		throw new Error("Error while deleting workspace");
	}

	dispatch(setSuccessDelete(workspaceId));
};

/* delete collaborator */
const deleteCollaborator = async (workspaceId, userId) => {
	const resRelations = await workspaces.get(
		`/workspaceUsers?workspaceId=${workspaceId}&userId=${userId}`
	);

	if (resRelations.status !== 200) {
		throw new Error(resRelations.statusText);
	} else if (resRelations.data[0].role === "admin") {
		throw new Error("Admin cannot be removed");
	}

	const resCreateRelations = await workspaces.delete(
		`/workspaceUsers/${resRelations.data[0].id}`
	);

	if (resCreateRelations.status !== 200) {
		throw new Error(resCreateRelations.statusText);
	}
};

const toExport = {
	addCollaborator,
	create,
	getRelations,
	deleteById,
	getByUserId,
	deleteCollaborator,
	update,
};

export default toExport;
