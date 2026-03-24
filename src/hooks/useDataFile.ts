import {useEffect, useState} from "react";
import {useAuthorize} from "./useAuthorize.ts";
import {useOcto} from "./useOcto.ts";

export type Data = {
    arrivalTimes: Record<number, WeeklyGuess[]>;
};

export const useDataFile = () => {
    const {getToken} = useAuthorize();
    const {getFile} = useOcto();
    const [data, setData] = useState<Data>()

    useEffect(() => {
        async function loadDataFromPublicFolder() {
            const response = await fetch("/arrival-times.json")
            const json = await response.json()
            setData(json);
        }

        async function loadDataFromGithub() {
            const file = await getFile();
            setData(file.content)
        }

        const token = getToken();
        if (!!token) {
            loadDataFromGithub();
        } else {
            loadDataFromPublicFolder();
        }
    }, [])

    return data;
}