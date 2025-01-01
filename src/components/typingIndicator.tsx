import React from "react";

const TypingIndicator = () => (
    <div className="flex gap-x-1 px-4 py-3 bg-[#f0f0f0] rounded-t-xl rounded-br-xl">
        <div
            className="p-0.5 bg-[#5E5E5E] rounded-full animate-typing"
            style={{ animationDelay: "0s" }}
        ></div>
        <div
            className="p-0.5 bg-[#5E5E5E] rounded-full animate-typing"
            style={{ animationDelay: "0.2s" }}
        ></div>
        <div
            className="p-0.5 bg-[#5E5E5E] rounded-full animate-typing"
            style={{ animationDelay: "0.4s" }}
        ></div>
    </div>
);

export default TypingIndicator;
