export const useTimeCalculator = () => {
	const toMinutes = (time: string) => {
		const [hours, minutes] = time.split(":").map(Number);
		return hours * 60 + minutes;
	};

	const calculateDifference = (timeOne: string, timeTwo: string) => {
		const t1 = toMinutes(timeOne);
		const t2 = toMinutes(timeTwo);
		return Math.abs(t1 - t2);
	};

	return {
		calculateDifference: calculateDifference,
	};
};
