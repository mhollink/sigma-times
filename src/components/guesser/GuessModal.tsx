import * as React from "react";
import {useEffect, useCallback} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useAuthorize} from "../../hooks/useAuthorize.ts";
import {useOcto} from "../../hooks/useOcto.ts";
import TextField from "@mui/material/TextField";
import {FormHelperText} from "@mui/material";
import type {Data} from "../../hooks/useDataFile.ts";

const neonColor = "#7CFFCB";
const neonError = "#FF6B6B";
const TIME_PATTERN = /^([01]?\d|2[0-3]):[0-5]\d$/;

export const GuessModal = () => {
    const {getToken, getUser} = useAuthorize();
    const {getFile, updateGuesses} = useOcto();

    const [open, setOpen] = React.useState(false);
    const [sha, setSha] = React.useState("");
    const [content, setContent] = React.useState<Data>("");
    const [invalidEntries, setInvalidEntries] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);

    const token = getToken();
    const user = getUser();

    const fetchFileData = useCallback(async () => {
        const {sha, content} = await getFile();
        setSha(sha);
        setContent(content);
    })

    useEffect(() => {
        fetchFileData();
    }, [token]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validateInput = (input: Record<string, string>) => {
        return Object.entries(input)
            .filter(([_, time]) => !TIME_PATTERN.test(time))
            .map(([field]) => field);
    }

    const mergeGuessesIntoData = (todaysGuesses: any, currentGuesses: any) => {
        const guessingPlayer = user?.name.toLowerCase();
        return todaysGuesses.map((player) => {
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
    }

    const createNewDay = () => {
        return [
            {name: "Tony", actual: "-", guesses: {}},
            {name: "Rik", actual: "-", guesses: {}},
            {name: "David", actual: "-", guesses: {}},
            {name: "Bart", actual: "-", guesses: {}},
            {name: "Roy", actual: "-", guesses: {}},
        ]
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());

        let invalidEntries = validateInput(formJson);
        if (invalidEntries.length > 0) {
            setInvalidEntries(invalidEntries);
            return;
        }

        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        const times = content.arrivalTimes;
        const todaysGuesses = times[today] ?? createNewDay();

        const updatesGuesses = mergeGuessesIntoData(todaysGuesses, formJson);
        const updatedContent = {
            arrivalTimes: {
                ...content.arrivalTimes,
                [today]: updatesGuesses,
            }
        };

        await updateGuesses(updatedContent, sha);

        handleClose();
        setLoading(false);
        window.location.reload()
    };

    const canPlaceAGuess = () => {
        if (!content || !content.arrivalTimes) return false;
        const today = new Date().toISOString().split('T')[0];
        const times = content.arrivalTimes;
        if (!times[today]) {
            // No data for today, so first player placing guesses.
            return true;
        }

        const todaysGuesses = times[today];
        const guessers = Object.keys(todaysGuesses[0].guesses);

        return !guessers.includes(user?.name.toLowerCase());
    }

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
                        Enter your guesses for the arrival times below using the <b
                        style={{color: neonColor}}>hh:mm</b> format.
                    </DialogContentText>

                    {showInput ? (
                        <form onSubmit={handleSubmit} id="sign-in-form">
                            <TimeFormField label={"Bart"} name={"bart"} invalid={invalidEntries.includes("bart")}/>
                            <TimeFormField label={"David"} name={"david"} invalid={invalidEntries.includes("david")}/>
                            <TimeFormField label={"Rik"} name={"rik"} invalid={invalidEntries.includes("rik")}/>
                            <TimeFormField label={"Roy"} name={"roy"} invalid={invalidEntries.includes("roy")}/>
                            <TimeFormField label={"Tony"} name={"tony"} invalid={invalidEntries.includes("tony")}/>
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
                            <span style={{margin: "4px"}}>You have already submitted today's guesses.</span>
                        </Alert>
                    )}

                </DialogContent>

                <DialogActions sx={{justifyContent: "space-between", px: 3}}>
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
                                px: 4
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

function TimeFormField({name, label, invalid}) {
    return (<>
        <TextField
            autoFocus
            required
            margin="dense"
            id={name}
            name={name}
            label={label}
            type="text"
            fullWidth
            variant="standard"
            placeholder="09:00"
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
        {invalid && (
            <FormHelperText sx={{
                color: neonError,
                textShadow: `0 0 px ${neonError}`
            }}>Input should be formatted hh:mm.</FormHelperText>
        )}
    </>)
}