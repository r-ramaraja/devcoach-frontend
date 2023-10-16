import React from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome, AiFillBug } from "react-icons/ai";
import { BsPenFill, BsCodeSlash, BsFillHouseDoorFill, BsBugFill } from 'react-icons/bs';

const MainMenu = (props) => {
  const phaseId = useParams().phaseId;
  return (
    <div className={props.className + "w-full h-full bg-brand text-slate-50 pt-9 text-2xl"}>
      <nav>
        <ul className="flex flex-col w-full">
          <li className="w-full">
            <Link 
              to={`/`} 
              className={`block w-full hover:bg-brand-accent hover:text-black`}
            >
              <span className="px-8 flex flex-row gap-1 items-center"><AiFillHome />Home</span>
            </Link>
          </li>
          <li className="w-full">
            <Link 
              to={`/phase/design`} 
              className={
                `block w-full hover:bg-brand-accent hover:text-black ${phaseId === 'design' ? 'bg-brand-accent text-black':''}`
              }
            >
              <span className="px-8 flex flex-row gap-1 items-center"><BsPenFill /> Design</span>
            </Link>
          </li>
          <li>
            <Link 
              to={`/phase/develop`} 
              className={
                `block w-full hover:bg-brand-accent hover:text-black ${phaseId === 'develop' ? 'bg-brand-accent text-black':''}`
              }
            >
              <span className="px-8 flex flex-row gap-1 items-center"><BsCodeSlash /> Develop</span>
            </Link>
          </li>
          <li>
            <Link 
              to={`/phase/test`} 
              className={
                `block w-full hover:bg-brand-accent hover:text-black ${phaseId === 'test' ? 'bg-brand-accent text-black':''}`
              }
            >
              <span className="px-8 flex flex-row gap-1 items-center"><BsBugFill /> Test</span>
            </Link>
          </li>
          <li>
            <Link 
              to={`/phase/meeting`} 
              className={
                `block w-full hover:bg-brand-accent hover:text-black ${phaseId === 'meeting' ? 'bg-brand-accent text-black':''}`
              }
            >
              <span className="px-8 flex flex-row gap-1 items-center"><BsFillHouseDoorFill /> Meeting</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;