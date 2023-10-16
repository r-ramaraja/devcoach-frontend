import React, {useState} from "react";
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";
import { Link, useLoaderData, useParams } from "react-router-dom";

export async function projectsLoader({ params }) {
  const projects = [
    {
			id: 'design@project-1', 
			name: 'Project 1', 
			phase: 'design', 
			chats: [
				{id: 'design@project-1@intial-sketch', name:'Initial Sketch'}, 
				{id: 'design@project-1@design-1', name:'Design 1'}, 
			]
		},
		{ 
			id: 'design@project-2',
			name: 'Project 2', 
			phase: 'design', 
			chats: [
				{id: 'design@project-2@intial-sketch', name:'Initial Sketch'}, 
				{id: 'design@project-2@design-1', name:'Design 1'}, 
			]
		},
		{
			id: '3@design', 
			name: 'Project 3', 
			phase: 'design', 
			chats: [
				{id: 'design@project-3@intial-sketch', name:'Initial Sketch'}, 
				{id: 'design@project-3@design-1', name:'Design 1'}, 
				{id: 'design@project-3@design-2', name: 'Design 2'}
			]
		},
  ];
  return { projects };
}

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