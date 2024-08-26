/** @type {import('tailwindcss').Config} */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				sectionTitleSize: "50px",
				bodyColor: "#242424",
				lightText: "#00df9a",
				darkText: "#047857",
				lightText2: "white",
				errorText: "#ff014f",
				successText: "#00df9a",
				buttonHoverBg: "#009688",
				buttonActiveBg: "#00766c",
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
				inputBg: "rgba(255, 255, 255, 0.08)",
				inputBorder: "#f1f3f6",
				buttonColor: "#00df9a",
				boxBg: "linear-gradient(145deg, #1e2024, #23272b)",
				designColor: "#ff014f",
			},
			sizes: {},
			boxShadow: {
				shadowOne: "10px 10px 19px #1c1e22, -10px -10px 19px #262a2e",
			},
		},
	},
	plugins: [tailwindcss, autoprefixer],
};
