import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: "451px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
        extend: {
            animation: {
                typing: "typing 1s infinite ease-in-out",
            },
            keyframes: {
                typing: {
                    "0%, 100%": { opacity: "1", transform: "translateY(0)" },

                    "50%": { opacity: "0.75", transform: "translateY(-5px)" },
                },
            },
        },
    },
    plugins: [nextui(), require("tailwind-scrollbar")({ nocompatible: true })],
};
