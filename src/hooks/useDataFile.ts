import { useCallback, useEffect, useState } from "react";
import type { WeeklyGuess } from "../types/data.ts";
import { useAuthorize } from "./useAuthorize.ts";
import { useOcto } from "./useOcto.ts";

export type Data = {
	arrivalTimes: Record<string, WeeklyGuess[]>;
};

export const useDataFile = () => {
	const { getToken } = useAuthorize();
	const { getFile } = useOcto();
	const [data, setData] = useState<Data>();

	const loadDataFromPublicFolder = useCallback(async () => {
		const response = await fetch("/sigma-times/arrival-times.json");
		const json = await response.json();
		setData(json);
	});

	const loadDataFromGithub = useCallback(async (token) => {
		const file = await getFile(token);
		setData(file.content);
	});

	useEffect(() => {
		if (import.meta.env.MODE === "development") {
			// running locally,
			// use the local file;
			loadDataFromPublicFolder();
			return;
		}

		const token = getToken();
		if (!token) {
			// running without a token... unable to remote fetch,
			// use the local file.
			loadDataFromPublicFolder();
			return;
		}

		// has configured a token,
		// try to use the remote file.
		loadDataFromGithub(token);
	}, []);

	return data;
};
