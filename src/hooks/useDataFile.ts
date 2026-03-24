import {useState, useEffect} from "react";

export type Data = {
    arrivalTimes: Record<number, WeeklyGuess[]>;
};

export const useDataFile = () => {
    const [data, setData] = useState<Data>()

    useEffect(() => {
        async function loadData() {
            const response = await fetch("/arrival-times.json")
            const json = await response.json()
            setData(json);
        }

        loadData();
    }, [])

    return data;
}