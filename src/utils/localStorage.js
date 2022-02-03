import { decryptText } from "./crypto";

const KEYS = {
	AUTH_TOKEN: "asdunasxasoilsamdas",
	REMEMBER: "asmdismsadasdin",
};

/**
 *
 * @returns { { email: string; } }
 */
const getRemember = () =>
	JSON.parse(decryptText(localStorage.getItem(KEYS.REMEMBER)));

export { KEYS, getRemember };
