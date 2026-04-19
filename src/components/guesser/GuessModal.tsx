import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";
import { useAuthorize } from "../../hooks/useAuthorize.ts";
import type { Data } from "../../hooks/useDataFile.ts";
import { useOcto } from "../../hooks/useOcto.ts";
import type { WeeklyGuess } from "../../types/data.ts";

const neonColor = "#7CFFCB";
const neonError = "#FF6B6B";
const TIME_PATTERN = /^([01]?\d|2[0-3]):[0-5]\d$/;

export const GuessModal = () => {
	const { getToken, getUser } = useAuthorize();
	const { getFile, updateGuesses } = useOcto();

	const [open, setOpen] = React.useState(false);
	const [sha, setSha] = React.useState("");
	const [content, setContent] = React.useState<Data | undefined>(undefined);
	const [invalidEntries, setInvalidEntries] = React.useState<string[]>([]);
	const [loading, setLoading] = React.useState(false);

	const token = getToken();
	const user = getUser();

	useEffect(() => {
		if (!token) return;

		const fetchFileData = async (token: string) => {
			const { sha, content } = await getFile(token);
			setSha(sha);
			setContent(content);
		};

		fetchFileData(token);
	}, [token, getFile]);

	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const validateInput = (input: Record<string, string>[]) => {
		return input
			.filter(({ value }) => value !== "WFH.")
			.filter(({ value }) => !TIME_PATTERN.test(value))
			.map(({ key }) => key);
	};

	const mergeGuessesIntoData = (
		todaysGuesses: WeeklyGuess[],
		currentGuesses: Record<string, string>,
	) => {
		const guessingPlayer = user!.name.toLowerCase();

		return todaysGuesses.map((player: WeeklyGuess) => {
			const key = player.name.toLowerCase();
			const guess = currentGuesses[key];

			if (!guess) return player;

			return {
				...player,
				guesses: {
					...player.guesses,
					[guessingPlayer]: guess,
				},
			};
		});
	};

	const createNewDay = () => {
		return [
			{ name: "Tony", actual: "-", guesses: {} },
			{ name: "Rik", actual: "-", guesses: {} },
			{ name: "David", actual: "-", guesses: {} },
			{ name: "Bart", actual: "-", guesses: {} },
			{ name: "Roy", actual: "-", guesses: {} },
		];
	};

	const getValidatedInput = (event: React.SubmitEvent<HTMLFormElement>) => {
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());

		const times = Object.entries(formJson).map(([key, value]) => {
			const [name, suffix] = key.split(":");
			return {
				key: name,
				value: suffix === "wfh" ? "WFH." : value,
			};
		});

		const invalidEntries = validateInput(times);
		if (invalidEntries.length > 0) {
			setInvalidEntries(invalidEntries);
			return null;
		}

		const inputEntries = times.map(({ key, value }) => [key, value]);
		return Object.fromEntries(inputEntries);
	};

	function getTodaysGuesses(today: string) {
		const times = content!.arrivalTimes;
		return times[today] ?? createNewDay();
	}

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		setLoading(true);

		event.preventDefault();
		const playerGuesses = getValidatedInput(event);

		if (!playerGuesses) {
			setLoading(false);
			return;
		}

		const today = new Date().toISOString().split("T")[0];
		const todaysGuesses = getTodaysGuesses(today);
		const updatesGuesses = mergeGuessesIntoData(todaysGuesses, playerGuesses);

		const updatedContent = {
			arrivalTimes: {
				...content!.arrivalTimes,
				[today]: updatesGuesses,
			},
		};

		await updateGuesses(updatedContent, sha);

		handleClose();
		setLoading(false);
		window.location.reload();
	};

	const canPlaceAGuess = () => {
		if (!content || !content.arrivalTimes) return false;
		const today = new Date().toISOString().split("T")[0];
		const times = content.arrivalTimes;
		if (!times[today]) {
			// No data for today, so first player placing guesses.
			return true;
		}

		const todaysGuesses = times[today];
		const guessers = Object.keys(todaysGuesses[0].guesses);

		return !guessers.includes(user!.name.toLowerCase());
	};

	const showInput = canPlaceAGuess();

	return (
		<React.Fragment>
			{token && (
				<Button
					variant="outlined"
					sx={{
						color: neonColor,
						borderColor: neonColor,
						textShadow: `0 0 6px ${neonColor}`,
						"&:hover": {
							borderColor: neonColor,
							boxShadow: `0 0 8px ${neonColor}, 0 0 16px ${neonColor}`,
						},
					}}
					onClick={handleClickOpen}
				>
					Place guesses
				</Button>
			)}

			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {
						backgroundColor: "rgba(255, 255, 255, 0.15)",
						backdropFilter: "blur(24px)",
						border: `1px solid ${neonColor}`,
						boxShadow: `0 0 15px ${neonColor}`,
					},
				}}
			>
				<DialogTitle
					sx={{
						color: neonColor,
						textShadow: `0 0 6px ${neonColor}`,
					}}
				>
					Guesses
				</DialogTitle>

				<DialogContent>
					<DialogContentText
						sx={{
							color: "#fff",
							textShadow: `0 0 4px rgba(0,0,0,0.3)`,
							marginBottom: 2,
						}}
					>
						Enter your guesses for the arrival times below using the{" "}
						<b style={{ color: neonColor }}>hh:mm</b> format.
					</DialogContentText>

					{showInput ? (
						<form onSubmit={handleSubmit} id="sign-in-form">
							<TimeFormField
								label={"Bart"}
								name={"bart"}
								invalid={invalidEntries.includes("bart")}
							/>
							<TimeFormField
								label={"David"}
								name={"david"}
								invalid={invalidEntries.includes("david")}
							/>
							<TimeFormField
								label={"Rik"}
								name={"rik"}
								invalid={invalidEntries.includes("rik")}
							/>
							<TimeFormField
								label={"Roy"}
								name={"roy"}
								invalid={invalidEntries.includes("roy")}
							/>
							<TimeFormField
								label={"Tony"}
								name={"tony"}
								invalid={invalidEntries.includes("tony")}
							/>
						</form>
					) : (
						<Alert
							severity="warning"
							sx={{
								background: "rgba(255, 107, 107, 0.3)",
								backdropFilter: "blur(120px)",
								WebkitBackdropFilter: "blur(120px)",

								border: `1px solid ${neonError}`,
								borderRadius: "12px",

								color: neonError,

								boxShadow: `
                                  0 0 8px ${neonError},
                                  0 0 16px ${neonError}55,
                                  inset 0 0 8px rgba(255,255,255,0.1)
                                `,
								textShadow: `0 0 8px rgba(0,0,0,0.6)`,

								"& .MuiAlert-icon": {
									color: neonError,
								},

								"& .MuiAlert-message": {
									fontWeight: 800,
									letterSpacing: "0.3px",
								},
							}}
						>
							<span style={{ margin: "4px" }}>
								You have already submitted today's guesses.
							</span>
						</Alert>
					)}
				</DialogContent>

				<DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
					<Button
						onClick={handleClose}
						sx={{
							color: neonColor,
							borderColor: neonColor,
							"&:hover": {
								borderColor: neonColor,
								boxShadow: `0 0 8px ${neonColor}`,
							},
						}}
					>
						Cancel
					</Button>

					{showInput && !loading && (
						<Button
							type="submit"
							form="sign-in-form"
							sx={{
								color: "transparant",
								fontWeight: 600,
								background: `linear-gradient(90deg, ${neonColor}, #3EDFFF)`,
								boxShadow: `0 0 10px ${neonColor}, 0 0 20px #3EDFFF`,
								"&:hover": {
									boxShadow: `0 0 15px ${neonColor}, 0 0 30px #3EDFFF`,
								},
								textTransform: "none",
								px: 4,
							}}
						>
							Submit
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

function TimeFormField({
	name,
	label,
	invalid,
}: {
	name: string;
	label: string;
	invalid: boolean;
}) {
	const [time, setTime] = useState("");
	const [wfh, setWfh] = useState(false);
	return (
		<Stack direction="column" spacing={2}>
			<Stack direction="row" alignItems="end" spacing={2}>
				<TextField
					autoFocus
					required
					margin="dense"
					id={name}
					name={`${name}:value`}
					label={label}
					type="text"
					fullWidth
					variant="standard"
					placeholder="09:00"
					value={time}
					onChange={(e) => setTime(e.target.value)}
					disabled={wfh}
					sx={{
						"& .MuiInputBase-input": {
							color: neonColor,
						},
						"& .MuiInput-underline:before": {
							borderBottomColor: neonColor,
						},
						"& .MuiInput-underline:after": {
							borderBottomColor: neonColor,
						},
						"& .MuiInputLabel-root": {
							color: neonColor,
						},
						"& .MuiInputLabel-root.Mui-focused": {
							color: neonColor,
						},
					}}
				/>
				<FormControlLabel
					label=""
					control={
						<Checkbox
							id={`${name}-wfh`}
							name={`${name}:wfh`}
							value={wfh}
							onChange={(_, value) => setWfh(value)}
							icon={<HomeOutlinedIcon />}
							checkedIcon={<HomeIcon />}
							title="Works from home."
							sx={{
								color: neonColor,
								"&.Mui-checked": {
									color: neonColor,
								},
								"& .MuiSvgIcon-root": {
									fontSize: 24,
								},
							}}
						/>
					}
				/>
			</Stack>

			{invalid && (
				<FormHelperText
					sx={{
						color: neonError,
						textShadow: `0 0 px ${neonError}`,
					}}
				>
					Input should be formatted hh:mm.
				</FormHelperText>
			)}
		</Stack>
	);
}
