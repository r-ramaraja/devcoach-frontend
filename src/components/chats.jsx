import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import { randomChat } from "../utils/randomChat";

const Avator = (props)  =>{
  const avatarLinsl = [
    {titile: "StakeHolder1", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=lisa", color: "bg-yellow-500	"},
    {titile: "StakeHolder2", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=john", color: "bg-green-500"},
    {titile: "Developer1", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=jennie", color: "bg-cyan-500"},
    {titile: "Developer2", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=mike", color: "bg-rose-500"},
    {titile: "TeamLeader", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=michelle", color: ""},
    {titile: "You", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=nothing", color: ""}, 
  ]

  const getSource = (title) => {
    return avatarLinsl.filter((avatar) => avatar.titile === title)[0].link
  }

  return (
    <div>
      <div className="w-12 aspect-square">
        <img
          src={getSource(props.title)}
          alt="avatar" 
        />
      </div>
    </div>
  )
}

const Chats = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_MODE==="ui"){
      //setMessages(chats.chats);
      
    }
    else {
      socketRef.current = socketIO.connect("http://localhost:3001");
      socketRef.current.on("GPTResponse", (data) => {
        const gptResponse = data.filter((message) => message.type === "AI");
        console.log(gptResponse);
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, ...gptResponse]);
      });
    }
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      
      
      
      if (process.env.REACT_APP_MODE === "ui"){
        const messageObject = {
          name: "You", 
          text: message, 
          id: `${Math.random()}`, 
        }

        setMessage("");
        setMessages((prevMessages) => [...prevMessages, messageObject]);
        setWaiting(true);
       
        const resps = randomChat();
        console.log(resps);
        for (const resp of resps) {
          await timeout(1000);
          setMessages((prevMessages) => [...prevMessages, resp]);
        }

        setWaiting(false);
      }
      else{
        const messageObject = {
          type: "human", 
          name: "You", 
          text: message, 
          id: `${socketRef.current.id}${Math.random()}`, 
          socketID: socketRef.current.id
        }
        setMessages((prevMessages) => [...prevMessages, messageObject])
        socketRef.current.emit("userMessage", messageObject);

        setMessage("");
      }
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
              <Avator title={message.name} />
              <div className="flex flex-col w-2/3">
                <div className="font-semibold">{message.name}</div>
                <p className="text-sm ">{message.text}</p>
              </div>
            </li>
          );
        })}
        {waiting && <li>
          <p>Waiting for agents...</p>
        </li>}
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
