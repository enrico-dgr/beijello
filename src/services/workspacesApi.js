import {
	setFailure,
	setLoading,
	setSuccess,
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

// -----------
// **POST**
// -----------

/* adding workSpaces */
const create = async ({ name }, userId) => {
	if (!name || !userId) {
		return {
			status: 404,
			statusText: "Data missing",
		};
	}

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

	let res = {
		status: resCreateWorkspace.status,
		statusText: resCreateWorkspace.statusText,
	};

	if (resCreateWorkspace.status !== 201) {
		return res;
	}

	const resCreateRelations = await workspaces.post(`/workspaceUsers`, {
		userId: userId,
		workspaceId: resCreateWorkspace.data.id,
		role: "admin",
	});

	// return errors on relation and delete workspace
	if (resCreateRelations.status !== 201) {
		res = {
			status: resCreateRelations.status,
			statusText: resCreateRelations.statusText,
		};
		deleteById(resCreateWorkspace.data.id);
		return res;
	}

	res.data = resCreateWorkspace.data;

	return res;
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
		error = "Authorization is not enought to edit this workspace";
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

const deleteById = (workspaceId) =>
	workspaces.delete(`/workspaces/${workspaceId}`);

const toExport = {
	create,
	deleteById,
	getByUserId,
	update,
};

export default toExport;
