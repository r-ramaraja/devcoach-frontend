import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import Avatar from "../components/avatar";
import TextArea from "./textarea";

const Chats = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    socketRef.current = socketIO.connect("http://localhost:3001");
    socketRef.current.on("GPTResponse", (data) => {
      const gptResponse = data.filter((message) => message.type === "AI");

      setMessages((prevMessages) => [...prevMessages, ...gptResponse]);
      setWaiting(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

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
        id: `${socketRef.current.id}${Math.random()}`,
        socketID: socketRef.current.id,
      };
      setMessages((prevMessages) => [...prevMessages, messageObject]);
      setWaiting(true);
      socketRef.current.emit("userMessage", messageObject);

      setMessage("");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <ul className=" w-full overflow-y-auto grow">
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
      </ul>

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
    </div>
  );
};

export default Chats;
