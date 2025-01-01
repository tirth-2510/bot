import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.tsx";
const rootElement = document.getElementById("cssBot");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
