import React, {useState} from "react";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";
import { Link, useLoaderData, useParams } from "react-router-dom";

const ProjectMenu = (props) => {
	const selectedProject = useLoaderData();
  const chatId = useParams().chatId;

	const [selectedChat, setSelectedChat] = useState(-1)

	return (
		<div className={props.className + "h-full bg-brand-accent px-8 pt-9 "}>
			{selectedProject.projects.length ? selectedProject.projects.map((project, i) => {
				return (
					<div key={project.id} className="w-full  ">
						<button 
							onClick={()=> {
								if (selectedChat === i )
									setSelectedChat(-1);
								else 
									setSelectedChat(i);
							}} 
							className="w-full h-fit flex flex-row justify-between items-center text-md"
						>
							<span>{project.name}</span> {selectedChat === i ?<BsFillCaretUpFill /> : <BsFillCaretDownFill />}
						</button>
						{selectedChat === i && 
							project.chats.map((chat, _) => {
								return (
									<div key={chat.id}>
										<Link to={`chat/${chat.id}`}  className={`${chatId === chat.id ? "text-brand":""} text-sm pl-3`}>{chat.name}</Link>
									</div>
								);
							})
						}
					</div>
				)
			}): <div>Loading</div>}
		</div>
	);
};

export default ProjectMenu;