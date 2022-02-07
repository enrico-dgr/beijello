/**
 *
 * @param {string} key
 * @param {string[]} values
 * @returns {string}
 */
const concatQueries = (key, values) => {
	let query = key + "=" + values[0];

	for (let i = 1; i < values.length; i++) {
		query += "&" + key + "=" + values[i];
	}

	return query;
};

export { concatQueries };
