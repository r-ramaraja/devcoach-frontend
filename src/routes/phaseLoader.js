export async function projectsLoader({ params }) {
  const projects = [
    {
      id: "design@project-1",
      name: "Project 1",
      phase: "design",
      chats: [{ id: "design@project-1@design-1", name: "Design 1" }],
    },
    {
      id: "design@project-2",
      name: "Project 2",
      phase: "design",
      chats: [{ id: "design@project-2@design-1", name: "Design 1" }],
    },
    {
      id: "3@design",
      name: "Project 3",
      phase: "design",
      chats: [
        { id: "design@project-3@design-1", name: "Design 1" },
        { id: "design@project-3@design-2", name: "Design 2" },
      ],
    },
  ];
  return { projects };
}
