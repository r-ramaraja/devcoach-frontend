import React from "react";

const Avatar = (props) => {
  const avatarList = [
    {
      name: "Sarah",
      link: "https://api.dicebear.com/7.x/miniavs/svg?seed=sarah",
      color: "bg-yellow-500	",
    },
    {
      name: "Tom",
      link: "https://api.dicebear.com/7.x/miniavs/svg?seed=john",
      color: "bg-green-500",
    },
    {
      name: "Sam",
      link: "https://api.dicebear.com/7.x/miniavs/svg?seed=jennie",
      color: "bg-cyan-500",
    },
    {
      name: "Henry",
      link: "https://api.dicebear.com/7.x/miniavs/svg?seed=michelle",
      color: "bg-rose-500",
    },
    { name: "You", link: "https://api.dicebear.com/7.x/miniavs/svg?seed=nothing", color: "" },
  ];

  const getSource = (name) => {
    return avatarList.filter((avatar) => avatar.name === name)[0].link;
  };

  return (
    <div>
      <div className="w-12 aspect-square">
        <img src={getSource(props.name)} alt="avatar" />
      </div>
    </div>
  );
};

export default Avatar;
