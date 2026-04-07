import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { GuessModal } from "../guesser/GuessModal.tsx";
import { SignInModal } from "../sign-in/SignInModal.tsx";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	padding: "8px 12px",
	backdropFilter: "blur(12px)",
	WebkitBackdropFilter: "blur(12px)",
	background: "rgba(255,255,255,0.1)",
	border: "1px solid rgba(255,255,255,0.2)",
	boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
	color: "white",
}));

const winnerStyle = {
	color: "#7CFFCB",
	fontWeight: 600,
	textShadow: "0 0 6px rgba(124, 255, 203, 0.9)",
};

export const AppBar = () => {
	return (
		<StyledToolbar variant="dense" disableGutters>
			<Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
				<Typography variant="h5">Sigma Time guesses</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					gap: 1,
					alignItems: "center",
				}}
			>
				<SignInModal />
				<GuessModal />
			</Box>
		</StyledToolbar>
	);
};
