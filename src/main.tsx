import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import theme from "./theme/theme.ts";
import "./theme/global-styles.css";

const element = document.getElementById("root");
createRoot(element).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<App />
			</LocalizationProvider>
		</ThemeProvider>
	</StrictMode>,
);
