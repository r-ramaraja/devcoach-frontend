import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import Avatar from "../components/avatar";
import TextArea from "./textarea";
import Editor from "./editor";
import { useParams } from "react-router-dom";

const Chats = (props) => {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState('print("Hello World!")');
  const socketRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [waiting, setWaiting] = useState(false);
  const urlParams = useParams();

  const intialMessage =
    urlParams.phaseId === "develop"
      ? {
          type: "AI",
          name: "Sam",
          role: "Senior Developer",
          text: "Hi! Welcome to the Develop phase of Software Engineering! I'm the Senior Developer of the team. I am here to work together, as a pair programmer, on the following user story.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          id: `${Math.random()}`,
        }
      : {
          type: "AI",
          name: "Tom",
          role: "Team Lead",
          text: "Hi! Welcome to the Design phase of Software Engineering! Join me, Sam (Senior Developer), and Sarah (Product Manager) as we work together to design a solution for a Movie Review System.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          id: `${Math.random()}`,
        };

  const [messages, setMessages] = useState([intialMessage]);

  useEffect(() => {
    setMessages([intialMessage]);
    socketRef.current = socketIO.connect("http://localhost:3001");

    if (urlParams.phaseId === "develop") {
      socketRef.current.emit("developPhaseInitialMessage");
      setWaiting(true);
    }
    socketRef.current.on("GPTResponse", (data) => {
      const gptResponse = data.filter((message) => message.type === "AI");

      setMessages((prevMessages) => [...prevMessages, ...gptResponse]);
      setWaiting(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [urlParams.phaseId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const messageObject = {
        type: "human",
        name: "You",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        phase: urlParams.phaseId,
        id: `${socketRef.current.id}${Math.random()}`,
        socketID: socketRef.current.id,
      };
      if (urlParams.phaseId === "develop") {
        messageObject.code = code;
      }
      setMessages((prevMessages) => [...prevMessages, messageObject]);
      setWaiting(true);
      socketRef.current.emit("userMessage", messageObject);

      setMessage("");
    }
  };

  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <div
        className={`h-full flex flex-col justify-center items-center ${
          urlParams.phaseId === "develop" ? "w-1/3" : "w-full"
        }`}
      >
        <ul
          className={
            ` w-full overflow-y-auto grow` + (urlParams.phaseId === "develop" ? ` h-1/3` : ``)
          }
        >
          {messages.map((message, index) => {
            return (
              <li
                key={message.id}
                ref={messages.length - 1 === index ? lastMessageRef : null}
                className={`${
                  index % 2 === 0 ? "bg-chat" : "bg-chat-accent"
                } flex flex-row w-full px-11 py-5 justify-center items-start gap-3 break-words animate-fade-in`}
              >
                <Avatar name={message.name} />
                <div className="flex flex-col w-2/3">
                  <div className="font-semibold">
                    {message.name === "You"
                      ? `${message.name} ${message.time}`
                      : `${message.name} (${message.role}) ${message.time}`}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </li>
            );
          })}
          {waiting && (
            <li
              className={`${
                messages.length % 2 === 0 ? "bg-chat" : "bg-chat-accent"
              } animate-pulse flex flex-row w-full px-11 py-5 justify-center items-start gap-3 break-words`}
            >
              <div className="w-12 aspect-square bg-slate-300 rounded-full"></div>
              <div className="flex flex-col w-2/3 gap-2 ">
                <div className="w-16 h-4 bg-slate-300 rounded-full"></div>
                <div className="w-full h-16 bg-slate-300 rounded-md"></div>
              </div>
            </li>
          )}
        </ul>{" "}
        {/*List of messages */}
        <div className="sticky bottom-0 w-full bg-chat-accent flex flex-row just-around gap-1 shadow-xl border-t border-slate-300">
          <TextArea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            disabled={waiting}
            onSubmit={() => handleSendMessage()}
          />
        </div>
        {/*Input box */}
      </div>

      {urlParams.phaseId === "develop" && (
        <div className=" w-2/3 h-full flex flex-col overflow-auto ">
          <div className="w-full h-full">
            <Editor code={code} setCode={setCode} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
