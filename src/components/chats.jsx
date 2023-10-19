import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";

const Chats = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIO.connect("http://localhost:3001");
    socketRef.current.on("GPTResponse", (data) =>
      setMessages((prevMessages) => [...prevMessages, ...data])
    );
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socketRef.current.emit("userMessage", {
        type: "human",
        name: "You",
        text: message,
        id: `${socketRef.current.id}${Math.random()}`,
        socketID: socketRef.current.id,
      });
    }
    setMessage("");
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
                index % 2 == 0 ? "bg-chat" : "bg-chat-accent"
              } flex flex-row w-full px-11 py-5 justify-center items-start gap-3`}
            >
              <div className="w-12 aspect-square bg-slate-800"></div>
              <div className="flex flex-col w-2/3">
                <div className="font-semibold">{message.name}</div>
                <p className="text-sm ">{message.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-0 w-full bg-chat-accent flex flex-row just-around gap-1 shadow-xl">
        <form className="w-full flex flex-row items-center" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow h-12 px-4 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="h-12 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors duration-300">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
