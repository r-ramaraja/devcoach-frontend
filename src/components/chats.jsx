import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import Avatar from "../components/avatar";

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
      console.log(gptResponse);
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, ...gptResponse]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      const messageObject = {
        type: "human",
        name: "You",
        text: message,
        id: `${socketRef.current.id}${Math.random()}`,
        socketID: socketRef.current.id,
      };
      setMessages((prevMessages) => [...prevMessages, messageObject]);
      setWaiting(true);
      socketRef.current.emit("userMessage", messageObject);
      setWaiting(false);
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
              } flex flex-row w-full px-11 py-5 justify-center items-start gap-3`}
            >
              <Avatar name={message.name} />
              <div className="flex flex-col w-2/3">
                <div className="font-semibold">{message.name}</div>
                <p className="text-sm ">{message.text}</p>
              </div>
            </li>
          );
        })}
        {/* Implement a loading indicator here instead of text message */}
        {waiting && (
          <li>
            <p>Waiting for agents...</p>
          </li>
        )}
      </ul>

      <div className="sticky bottom-0 w-full bg-chat-accent flex flex-row just-around gap-1 shadow-xl">
        <form className="w-full flex flex-row items-center" onSubmit={handleSendMessage}>
          <input
            placeholder="Type your message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="
              h-8
              padding-1
              leading-4
              flex-grow 
              overflow-hidden 
              resize-none 
              px-4 
              rounded-l-lg 
              border-2
            border-gray-300 
              my-1
              focus:outline-none 
              focus:border-blue-500
              "
          />
          <button className="h-8 px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors duration-300">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
