export const useAverage = () => (values: string[]) => {
	if (values.length === 0) {
		return "-";
	}

	const totalSeconds = values.reduce((sum, value) => {
		const [hours, minutes] = value.split(":").map(Number);

		return sum + (hours * 60 + minutes) * 60;
	}, 0);

	const averageSeconds = Math.round(totalSeconds / values.length);

	const averageHours = Math.floor(averageSeconds / 3600);
	const averageMinutes = Math.floor((averageSeconds % 3600) / 60);

	return [
		averageHours.toString().padStart(2, "0"),
		averageMinutes.toString().padStart(2, "0"),
	].join(":");
};
