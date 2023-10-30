export async function chatLoader({ params }) {
  console.log(params);

  const chats = [
    {
      id: `${Math.random()}`,
      name: "StakeHolder1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Ut enim blandit volutpat maecenas.",
    },
    {
      id: `${Math.random()}`,
      name: "StakeHolder2",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\n\nRequirement 1: Lorem ipsum dolor sit\nRequirement 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\nRequirement 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    {
      id: `${Math.random()}`,
      name: "TeamLeader",
      text: "Please come up with the design to fulfill the requirements. Afterwards we can discuss about the potential improvements. ",
    },
    {
      id: `${Math.random()}`,
      name: "You",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\n\nRequirement 1: Lorem ipsum dolor sit\nRequirement 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\nRequirement 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    {
      id: `${Math.random()}`,
      name: "TeamLeader",
      text: "Looks good! Continue with the next step. ",
    },
    {
      id: `${Math.random()}`,
      name: "Developer1",
      text: "I have a questions, what about... ",
    },
    {
      id: `${Math.random()}`,
      name: "Developer2",
      text: "You are right, we should consider... ",
    },
    {
      id: `${Math.random()}`,
      name: "Developer1",
      text: "Yes, yes, we have more constraints here... ",
    },
  ];
  return { chats };
}
