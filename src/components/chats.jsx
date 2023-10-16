import React from "react";
import { useLoaderData } from "react-router-dom";

export async function chatLoader({ params }) {
  console.log(params)
  const chats = [
    
		{id: '1@manager', name: 'Manager', texts: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Ut enim blandit volutpat maecenas.'},
		{id: '2@design-leader', name: 'Design Leader', texts: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\n\nRequirement 1: Lorem ipsum dolor sit\nRequirement 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\nRequirement 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },
		{id: '3@design-leader', name: 'Design Leader',texts:  'Please draw the initial sketch to fulfill the requirements. Afterwards we can discuss about the potential improvements. '},
    {id: '4@user', name: 'User', phase: 'design', texts: 'Following are my designs sketchs', images: [1, 2, 3]},
		{id: '5@manager', name: 'Manager', phase: 'design', texts: 'Looks good! Continue with the next step. '},
  ];
  return { chats };
}

/*

position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;*/

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