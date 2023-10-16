import React from "react";
import { useLoaderData } from "react-router-dom";

const Chats = (props) => {
  const chats = useLoaderData();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <ul className=" w-full overflow-y-auto grow">
        {chats.chats.map((chat, index) => {
          return (
            <li 
              key={chat.id} 
              className={`${index%2==0 ? "bg-chat":"bg-chat-accent"} flex flex-row w-full px-11 py-5 justify-center items-start gap-3`}
            >
              <div className="w-12 aspect-square bg-slate-800"></div>
              <div className="flex flex-col w-2/3">
                <div className="font-semibold">{chat.name}</div>
                <p className="text-sm ">{chat.texts}</p>
                <div className="flex flex-row w-full flex-wrap gap-3">
                  {chat.images && chat.images.map((image, ind)=> {
                    return (
                      <div key={ind} className="w-20 aspect-square bg-orange-600"></div>
                    )
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="sticky bottom-0 w-full bg-chat-accent flex flex-row just-around gap-1 shadow-xl">
        <input type="text" placeholder="Type your message" className="w-10/12 h-12"/>
        <button className="w-2/12">Send</button>
      </div>
    </div>
  );
};

export default Chats;