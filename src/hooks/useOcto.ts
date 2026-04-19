import { Octokit } from "@octokit/rest";
import { useCallback } from "react";
import { useAuthorize } from "./useAuthorize.ts";

export const useOcto = () => {
	const { getToken, getUser } = useAuthorize();

	const owner = "mhollink";
	const repo = "sigma-times";
	const path = "public/arrival-times.json";

	const octokit = new Octokit({ auth: getToken() });

	const getFile = useCallback(async (token: string) => {
		if (!token) throw new Error("Not (correctly) logged in!");

		const { data: file } = await octokit.repos.getContent({
			owner,
			repo,
			path,
		});

		return {
			sha: file.sha,
			content: JSON.parse(atob(file.content)),
		};
	}, []);

	const updateGuesses = useCallback(async (newData: any, sha: string) => {
		const user = getUser();
		if (!user) throw new Error("Not (correctly) logged in!");
		await octokit.repos.createOrUpdateFileContents({
			owner,
			repo,
			path,
			committer: {
				name: user.name,
				email: user.email,
			},
			message: `${user.name} updated guesses.json`,
			content: btoa(JSON.stringify(newData, null, 2)),
			sha,
		});
	}, []);

	return {
		getFile,
		updateGuesses,
	};
};
