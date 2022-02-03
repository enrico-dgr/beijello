import { decryptText } from "./crypto";

const KEYS = {
	AUTH_TOKEN: "asdunasxasoilsamdas",
	REMEMBER: "asmdismsadasdin",
};

/**
 *
 * @returns { { email: string; } | null }
 */
const getRemember = () => {
	const encrypted = localStorage.getItem(KEYS.REMEMBER);
	if (!!encrypted) {
		return JSON.parse(decryptText(encrypted));
	} else return null;
};
export { KEYS, getRemember };
