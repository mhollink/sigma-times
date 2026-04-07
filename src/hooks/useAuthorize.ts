export const useAuthorize = () => {
	const USERS = [
		{ token: "qoDqyrb", name: "Marcel", email: "mhollink@quintor.nl" },
		{ token: "qNRUMW", name: "Niels", email: "nkerdel@quintor.nl" },
		{ token: "PqsD1N", name: "Eric", email: "ehoudijk@quintor.nl" },
	];

	function getToken() {
		return localStorage.getItem("github-pat");
	}

	function setToken(token: string) {
		localStorage.setItem("github-pat", token);
	}

	function getUser() {
		const token = getToken();
		if (!token) {
			return null;
		}

		return USERS.find((user) => token.endsWith(user.token));
	}

	return {
		getToken,
		setToken,
		getUser,
	};
};
