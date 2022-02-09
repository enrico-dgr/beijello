import {
	setFailure,
	setLoading,
	setSuccessCreate,
	setSuccessDelete,
	setSuccessGet,
	setSuccessUpdate,
} from "../redux/ducks/workspacesDuck";

import axios from "axios";
import { concatQueries } from "../utils/query";
import { toast } from "react-toastify";

const errorToast = (msg) =>
	toast.error(msg, {
		position: "top-right",
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

const workspaceUsers = axios.create({
	baseURL: "http://localhost:3308/workspaceUsers",
});

const workspaces = axios.create({
	baseURL: "http://localhost:3308/workspaces",
});

const boards = axios.create({
	baseURL: "http://localhost:3308/boards",
});

const ticketLists = axios.create({
	baseURL: "http://localhost:3308/ticketLists",
});

const tickets = axios.create({
	baseURL: "http://localhost:3308/tickets",
});

const comments = axios.create({
	baseURL: "http://localhost:3308/comments",
});

/** */
const getFullWorkspaceById = (workspaceId) => {
	const embed = concatQueries("_embed", [
		"boards",
		"ticketLists",
		"tickets",
	]);

	return workspaces.get(`/${workspaceId}?${embed}`);
};

/** */
const reloadByIdAfterUpdate = async (workspaceId, dispatch) => {
	const res = await getFullWorkspaceById(workspaceId);

	if (res.status !== 200) {
		errorToast("Couldn't load updated data, try to reload page.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	dispatch(setSuccessUpdate(res.data));
};

/**
 * @returns array of workspaces
 */
const getWorkspacesByUserId = async (userId, dispatch) => {
	dispatch(setLoading());

	const res = await workspaceUsers.get(`?userId=${userId}`);

	if (res.status !== 200) {
		errorToast("Couldn't load user's workspaces, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	const filter = concatQueries(
		"id",
		res.data.map((relation) => relation.workspaceId)
	);
	const embed = concatQueries("_embed", [
		"boards",
		"ticketLists",
		"tickets",
	]);

	const resWorkspaces = await workspaces.get(`?${filter}&${embed}`);

	if (resWorkspaces.status !== 200) {
		errorToast("Couldn't load user's workspaces, retry later.");
		dispatch(setFailure(resWorkspaces.statusText));
		throw new Error(resWorkspaces.statusText);
	}

	dispatch(setSuccessGet(resWorkspaces.data));
};

/** */
const getRelationsByWorkspaceId = async (workspaceId) => {
	const res = await workspaceUsers.get(
		`?workspaceId=${workspaceId}&_expand=user`
	);

	if (res.status !== 200) {
		errorToast("Couldn't load collaborators, retry later.");
		throw new Error(res.statusText);
	}

	return res.data.map((r) => ({
		...r,
		user: {
			id: r.user.id,
			email: r.user.email,
			fullName: `${r.user.name} ${r.user.surname}`,
		},
	}));
};

/** */
const createCollaborator = async (workspaceId, userId, userIdToAdd) => {
	const permissionError = await checkAdminRole(workspaceId, userId);

	if (permissionError !== "") {
		errorToast(permissionError);
		throw new Error(permissionError);
	}

	const res = await workspaceUsers.get(
		`?workspaceId=${workspaceId}&userId=${userIdToAdd}`
	);

	if (res.status !== 200) {
		errorToast("Error while checking role");
		throw new Error(res.statusText);
	} else if (res.data.length > 0) {
		errorToast("User has already permissions");
		throw new Error("User has already permissions");
	}

	const resCreateRelations = await workspaceUsers.post(`/`, {
		userId: userIdToAdd,
		workspaceId,
		role: "collaborator",
	});

	if (resCreateRelations.status !== 201) {
		errorToast("Uknown error, retry later");
		throw new Error(resCreateRelations.statusText);
	}
};

/** */
const createWorkspace = async ({ name }, userId, dispatch) => {
	dispatch(setLoading());

	// CREATE workspace
	const res = await workspaces.post(`/`, {
		name,
	});

	if (res.status !== 201) {
		errorToast("Couldn't create workspace, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	// CREATE workspace-user relation
	// NOTE: this should probably be a server-side hidden action
	const resCreateRelations = await workspaceUsers.post(`/`, {
		userId: userId,
		workspaceId: res.data.id,
		role: "admin",
	});

	if (resCreateRelations.status !== 201) {
		errorToast("Couldn't create relation, retry later.");
		dispatch(setFailure(resCreateRelations.statusText));
		throw new Error(resCreateRelations.statusText);
	}

	dispatch(setSuccessCreate(res.data));
};

const checkPermissionToUpdateWorkspace = async (workspaceId, userId) => {
	let error = "";
	const resPermission = await workspaceUsers.get(
		`?userId=${userId}&workspaceId=${workspaceId}`
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

	return error;
};

const createBoard = async ({ name, layout, workspaceId }, userId, dispatch) => {
	dispatch(setLoading());

	const permissionError = await checkPermissionToUpdateWorkspace(
		workspaceId,
		userId
	);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await boards.post(`/`, {
		name,
		layout,
		workspaceId,
	});

	if (res.status !== 201) {
		errorToast("Couldn't create board, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	reloadByIdAfterUpdate(workspaceId, dispatch);
};

const createTicketList = async ({ name, board }, userId, dispatch) => {
	dispatch(setLoading());

	const permissionError = await checkPermissionToUpdateWorkspace(
		board.workspaceId,
		userId
	);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await ticketLists.post(`/`, {
		name,
		workspaceId: board.workspaceId,
		boardId: board.id,
	});

	if (res.status !== 201) {
		errorToast("Couldn't create ticket-list, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	reloadByIdAfterUpdate(board.workspaceId, dispatch);
};

const createTicket = async (
	{ title, description, tag, ticketList },
	userId,
	dispatch
) => {
	dispatch(setLoading());

	const permissionError = await checkPermissionToUpdateWorkspace(
		ticketList.workspaceId,
		userId
	);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await tickets.post(`/`, {
		title,
		description,
		tag,
		workspaceId: ticketList.workspaceId,
		boardId: ticketList.boardId,
		ticketListId: ticketList.id,
	});

	if (res.status !== 201) {
		errorToast("Couldn't create ticket, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	reloadByIdAfterUpdate(ticketList.workspaceId, dispatch);
};

const createComment = async ({ text, ticket, userId }, dispatch) => {
	dispatch(setLoading());

	const permissionError = await checkPermissionToUpdateWorkspace(
		ticket.workspaceId,
		userId
	);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await comments.post(`/`, {
		text,
		workspaceId: ticket.workspaceId,
		boardId: ticket.boardId,
		ticketListId: ticket.ticketListId,
		ticketId: ticket.id,
		userId,
	});

	if (res.status !== 201) {
		errorToast("Couldn't create comment, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	reloadByIdAfterUpdate(ticket.workspaceId, dispatch);
};

const updateTicket = async (
	{ id, title, description, tag, workspaceId, boardId, ticketListId },
	userId,
	dispatch
) => {
	dispatch(setLoading());

	const permissionError = await checkPermissionToUpdateWorkspace(
		workspaceId,
		userId
	);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await tickets.put(`/${id}`, {
		title,
		description,
		tag,
		workspaceId,
		boardId,
		ticketListId,
	});

	if (res.status !== 200) {
		errorToast("Couldn't update ticket, retry later.");
		dispatch(setFailure(res.statusText));
		throw new Error(res.statusText);
	}

	reloadByIdAfterUpdate(workspaceId, dispatch);
};

const checkAdminRole = async (workspaceId, userId) => {
	let error = "";
	const resPermission = await workspaceUsers.get(
		`?userId=${userId}&workspaceId=${workspaceId}`
	);

	if (resPermission.status !== 200) {
		error = "Server error, retry later";
	} else if (resPermission.data.length < 1) {
		error = "No authorization to operate in this workspace";
	} else if (resPermission.data[0].role !== "admin") {
		error = "Authorization is not enough to edit this workspace";
	}

	return error;
};

const deleteWorkspaceById = async (workspaceId, userId, dispatch) => {
	const permissionError = await checkAdminRole(workspaceId, userId);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await workspaces.delete(`/${workspaceId}`);

	if (res.status !== 200) {
		throw new Error("Error while deleting workspace");
	}

	dispatch(setSuccessDelete(workspaceId));
};

const deleteBoardById = async (board, userId, dispatch) => {
	const permissionError = await checkAdminRole(board.workspaceId, userId);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await boards.delete(`/${board.id}`);

	if (res.status !== 200) {
		throw new Error("Error while deleting board");
	}

	reloadByIdAfterUpdate(board.workspaceId, dispatch);
};

const deleteTicketListById = async (ticketList, userId, dispatch) => {
	const permissionError = await checkAdminRole(
		ticketList.workspaceId,
		userId
	);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await ticketLists.delete(`/${ticketList.id}`);

	if (res.status !== 200) {
		throw new Error("Error while deleting ticket list");
	}

	reloadByIdAfterUpdate(ticketList.workspaceId, dispatch);
};

const deleteTicketById = async (ticket, userId, dispatch) => {
	const permissionError = await checkAdminRole(ticket.workspaceId, userId);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const res = await tickets.delete(`/${ticket.id}`);

	if (res.status !== 200) {
		throw new Error("Error while deleting ticket");
	}

	reloadByIdAfterUpdate(ticket.workspaceId, dispatch);
};

const deleteCommentById = async (comment, userId, dispatch) => {
	const permissionError = await checkAdminRole(comment.workspaceId, userId);

	if (permissionError !== "") {
		dispatch(setFailure(permissionError));
		throw new Error(permissionError);
	}

	const resCommentOwner = await comments.get(`/${comment.id}`);

	if (resCommentOwner.status !== 200) {
		dispatch(setFailure("Error while checking ownerships"));
		throw new Error(resCommentOwner.statusText);
	} else if (resCommentOwner.data.userId !== userId) {
		dispatch(setFailure("You're not the owner of the comment"));
		throw new Error("Not the owener");
	}

	const res = await comments.delete(`/${comment.id}`);

	if (res.status !== 200) {
		throw new Error("Error while deleting comment");
	}

	reloadByIdAfterUpdate(comment.workspaceId, dispatch);
};

const deleteCollaborator = async (workspaceId, userId, userIdToDelete) => {
	const permissionError = await checkAdminRole(workspaceId, userId);

	if (permissionError !== "") {
		errorToast(permissionError);
		throw new Error(permissionError);
	}

	const resIsNotAdmin = await workspaceUsers.get(
		`?workspaceId=${workspaceId}&userId=${userIdToDelete}`
	);

	if (resIsNotAdmin.status !== 200) {
		errorToast("Error while checking role");
		throw new Error(resIsNotAdmin.statusText);
	} else if (resIsNotAdmin.data[0].role === "admin") {
		errorToast("Admin cannot be removed");
		throw new Error("Admin cannot be removed");
	}

	const res = await workspaceUsers.delete(`/${resIsNotAdmin.data[0].id}`);

	if (res.status !== 200) {
		errorToast("Unknown error, retry later");
		throw new Error(res.statusText);
	}
};

export {
	getWorkspacesByUserId,
	getRelationsByWorkspaceId,
	reloadByIdAfterUpdate,
	createCollaborator,
	createWorkspace,
	createBoard,
	createTicketList,
	createTicket,
	createComment,
	updateTicket,
	deleteWorkspaceById,
	deleteBoardById,
	deleteTicketListById,
	deleteTicketById,
	deleteCommentById,
	deleteCollaborator,
};
