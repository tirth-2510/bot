import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import Chat from "./components/chat";

function App() {
    return (
        <>
            <NextUIProvider>
                <Chat />
            </NextUIProvider>
        </>
    );
}

export default App;
