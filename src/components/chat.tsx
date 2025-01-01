import React, { useState, useRef, useEffect } from "react";
import { RiRobot2Line } from "react-icons/ri";
import { GoDependabot } from "react-icons/go";
import { IoArrowUp, IoPerson, IoChevronDown } from "react-icons/io5";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import TypingIndicator from "./typingIndicator";

type Message = {
    role: string;
    content: string;
};

export default function Chat() {
    const [documentId, setDocumentId] = useState<string | null>(null);
    const [buttonVis, setButtonVis] = useState<boolean>(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! 👋 How can I help you today?" },
    ]);
    const chatRef = useRef<HTMLDivElement>(null);
    const hasScriptBeenLoaded = useRef(false);

    useEffect(() => {
        const getUserIdFromScriptSrc = () => {
            const scriptElement = document.getElementById(
                "customerSupportServiceBotLink"
            ) as HTMLScriptElement | null;

            if (scriptElement) {
                const scriptSrc = scriptElement.getAttribute("src");
                if (scriptSrc) {
                    const userId = new URLSearchParams(
                        scriptSrc.split("?")[1]
                    ).get("id");
                    if (userId) {
                        setDocumentId(`id_${userId}`);
                    }
                }
            }
        };

        if (!hasScriptBeenLoaded.current) {
            getUserIdFromScriptSrc();
            hasScriptBeenLoaded.current = true;
        }

        if (documentId && !hasScriptBeenLoaded.current) {
            const script = document.createElement("script");
            script.src = `digibot.js?id=${documentId}`;
            script.async = true;
            document.body.appendChild(script);
            hasScriptBeenLoaded.current = true;
        }
    }, [documentId]);

    const handleChat = async () => {
        if (!userInput.trim()) return;

        const userMessage: Message = {
            role: "user",
            content: userInput.trim(),
        };
        setMessages((prev) => [...prev, userMessage]);

        const currentInput = userInput.trim();
        setUserInput("");

        const typingMessage: Message = { role: "assistant", content: "" };
        setMessages((prev) => [...prev, typingMessage]);

        try {
            const assistantMessage = async (
                currentInput: string
            ): Promise<string> => {
                const response = await axios.post(
                    `https://fastapipython-73zg.onrender.com/chat?document_id=${documentId}&user_input=${encodeURIComponent(
                        currentInput
                    )}`
                );
                return response.data.response;
            };

            const assistantResponse = await assistantMessage(currentInput);
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = {
                    role: "assistant",
                    content: assistantResponse,
                };
                return updatedMessages;
            });
        } catch (error) {
            setMessages((prev) => {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = {
                    role: "assistant",
                    content: "Failed to send a message.",
                };
                return updatedMessages;
            });
        }
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <button
                onClick={() => setButtonVis(!buttonVis)}
                style={{ zIndex: 2047483647 }}
                className={`fixed bottom-5 right-5 ${
                    buttonVis ? "hidden" : "block"
                } xs:block bg-yellow-500 text-2xl p-3 rounded-full text-black shadow-lg hover:bg-yellow-600 hover:text-black hover:scale-110 transition-all duration-300`}
            >
                {buttonVis ? <IoChevronDown /> : <RiRobot2Line />}
            </button>

            {buttonVis && (
                <div
                    className={`flex flex-col flex-grow fixed bg-white w-dvw h-dvh xs:shadow-2xl xs:rounded-3xl xs:fixed xs:left-auto xs:right-5 xs:top-auto xs:bottom-[84px] xs:w-[400px] xs:h-min-custom xs:min-h-[80px] xs:max-h-[600px] origin-bottom-right`}
                >
                    <div className="flex flex-grow-0 items-center justify-between p-4 w-full rounded-t-3xl bg-transparent shadow-md">
                        <div className="flex-grow">{""}</div>
                        <h1 className="text-4xl font-serif font-semibold text-black text-center">
                            DigiBot
                        </h1>
                        <div className="flex-grow flex items-center justify-end">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="warning"
                                radius="full"
                                className="flex items-center justify-center"
                                onPress={() => setButtonVis(!buttonVis)}
                            >
                                <RxCross2 className="text-yellow-600 font-extrabold text-lg" />
                            </Button>
                        </div>
                    </div>

                    <div
                        className="flex-grow p-4 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-[#f0f0f0] scrollbar-thumb-yellow-400 active:scrollbar-thumb-yellow-500 scrollbar-thin"
                        ref={chatRef}
                    >
                        <div className="grid gap-y-3 grid-cols-4">
                            {messages.map((msg, idx) =>
                                msg.role === "assistant" ? (
                                    <div
                                        className="flex items-end col-start-1 col-end-4 gap-x-2"
                                        key={idx}
                                    >
                                        <Avatar
                                            icon={<GoDependabot />}
                                            radius="full"
                                            size="sm"
                                            className="flex-shrink-0 shadow-md bg-black text-white text-md"
                                        />
                                        {msg.content ? (
                                            <div
                                                className={`p-3 font-sans text-sm shadow-md max-w-full break-words bg-[#f0f0f0] text-black rounded-t-xl rounded-br-xl justify-self-start`}
                                            >
                                                {msg.content}
                                            </div>
                                        ) : (
                                            <TypingIndicator />
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="flex flex-row-reverse items-end col-start-2 col-end-5 gap-x-2"
                                        key={idx}
                                    >
                                        <Avatar
                                            icon={<IoPerson />}
                                            radius="full"
                                            size="sm"
                                            className="flex-shrink-0 shadow-md bg-yellow-400 text-black text-md"
                                        />
                                        <div
                                            className={`p-3 font-sans text-sm shadow-md max-w-full break-words bg-yellow-400 text-black rounded-t-xl rounded-bl-xl justify-self-end`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div ref={chatRef}></div>
                    </div>

                    <form
                        className="flex flex-grow-0 items-start justify-between rounded-b-3xl bg-transparent p-4 w-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (userInput.trim()) {
                                handleChat();
                            }
                        }}
                    >
                        <Input
                            type="text"
                            color="default"
                            radius="full"
                            variant="bordered"
                            size="lg"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask me anything..."
                            classNames={{
                                inputWrapper:
                                    "pr-2 group-data-[focus=true]:border-[#c0c0c0] group-data-[hover=true]:border-[#c0c0c0]",
                                input: "text-sm font-sans",
                            }}
                            endContent={
                                <Button
                                    className="bg-yellow-500 text-black"
                                    size="sm"
                                    isDisabled={userInput.trim() === ""}
                                    isIconOnly
                                    radius="full"
                                    type="submit"
                                >
                                    <IoArrowUp className="text-xl" />
                                </Button>
                            }
                        />
                    </form>
                </div>
            )}
        </>
    );
}
