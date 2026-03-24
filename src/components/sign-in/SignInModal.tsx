import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useAuthorize} from "../../hooks/useAuthorize.ts";

const neonColor = "#7CFFCB";

export const SignInModal = () => {
    const {getUser, setToken} = useAuthorize();
    const [open, setOpen] = React.useState(false);

    const user = getUser();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const token = formJson.token as string;
        setToken(token);
        handleClose();
    };

    return (
        <React.Fragment>
            {!user && (
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
                    Sign In
                </Button>
            )}

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(8px)",
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
                    Sign In
                </DialogTitle>

                <DialogContent>
                    <DialogContentText
                        sx={{
                            color: "#fff",
                            textShadow: `0 0 4px rgba(0,0,0,0.3)`,
                            marginBottom: 2,
                        }}
                    >
                        To sign-in to this and start placing bets, pleas provide the access token that was given to you.
                    </DialogContentText>

                    <form onSubmit={handleSubmit} id="sign-in-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="token"
                            name="token"
                            label="Access Token"
                            type="password"
                            fullWidth
                            variant="standard"
                            sx={{
                                "& .MuiInputBase-input": {
                                    color: neonColor,
                                },
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: neonColor,
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: neonColor,
                                    boxShadow: `0 0 8px ${neonColor}`,
                                },
                                "& .MuiInputLabel-root": {
                                    color: neonColor,
                                    textShadow: `0 0 6px ${neonColor}`,
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: neonColor,
                                    textShadow: `0 0 8px ${neonColor}`,
                                },
                            }}
                        />
                    </form>
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
                        }}
                    >
                        Authorize
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};