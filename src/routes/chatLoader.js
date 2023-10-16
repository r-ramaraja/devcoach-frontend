export async function chatLoader({ params }) {
  console.log(params);
  const chats = [
    {
      id: "1@manager",
      name: "Manager",
      texts:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Ut enim blandit volutpat maecenas.",
    },
    {
      id: "2@design-leader",
      name: "Design Leader",
      texts:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\n\nRequirement 1: Lorem ipsum dolor sit\nRequirement 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.\nRequirement 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    },
    {
      id: "3@design-leader",
      name: "Design Leader",
      texts:
        "Please draw the initial sketch to fulfill the requirements. Afterwards we can discuss about the potential improvements. ",
    },
    {
      id: "4@user",
      name: "User",
      phase: "design",
      texts: "Following are my designs sketchs",
      images: [1, 2, 3],
    },
    {
      id: "5@manager",
      name: "Manager",
      phase: "design",
      texts: "Looks good! Continue with the next step. ",
    },
  ];
  return { chats };
}
