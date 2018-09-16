class serverUrlHelper {
	constructor() {}

	static getUrlBySection(sectionName) {
		return sectionName === "movies"
			? process.env.BASE_URL_MOVIE
			: sectionName === "tvs"
				? process.env.BASE_URL_TV
				: "";
	}
}

module.exports = serverUrlHelper;
