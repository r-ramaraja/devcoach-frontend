import React from "react";
import { Link } from "react-router-dom";

const PhaseCards = (props) => {
  return (
    <div className="flex flex-col px-5 rounded-sm justify-between items-start w-full bg-chat-accent p-2 lg:w-1/4 lg:p-5">
      <div>
        <p className="text-2xl mb-2">{props.name}</p>
        <p className="text-lg text-slate-600">{props.description}</p>
      </div>
      <button className="bg-brand hover:bg-brand-accent self-end lg:w-full transition-colors duration-100">
        <Link to={props.link} className=" block w-full text-fa p-1">
          Start Exploring
        </Link>
      </button>
    </div>
  )
}

const HomePage = () => {
  const phases = [
    {name:"Design", description:"Understand customer needs, create user stories, define system goals, create requirements for developers", link:"/phase/design"},
    {name: "Develop", description:"Develop with design requirements, review other developer's code", link:"/phase/develop"},
    {name: "Test", description:"Create test cases for the prototypes", link:"/phase/test"},
    {name: "Meeting", description:"Summary the current sprint, make plans for the next", link:"/phase/meeting"},
  ]

  return (
    <React.Fragment>
      <div className=" h-full w-full flex flex-row items-center justify-center">
        <div className="w-4/5 h-4/5 flex flex-col ">
          <div className="text-6xl font-bold mb-4 text-brand">DevCoach</div>
          
          <div className="mb-9 text-xl lg:text-4xl ">Learn and practice the agile process with LLM powered simulation environment.</div>
          <div className="flex flex-col lg:flex-row gap-6 w-full h-1/2 ">
            {phases.map((phase) => {
              return (
                <PhaseCards 
                  name={phase.name}
                  description={phase.description}
                  link={phase.link}
                />
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;