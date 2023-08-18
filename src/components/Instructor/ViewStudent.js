import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const ViewStudent = () => {
  const user = {
    name: "Jese Leos",
    email: "jese@fakemail.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
    course: 1,
    modul: "4/10",
    progress: "40%",
  };
  
  const Progress = ({done}) => {
    const [style, setStyle] = React.useState({});
    
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`
      }
      
      setStyle(newStyle);
    }, 200);
  
    return (
      <div className="relative mt-1 mx-auto w-30 bg-zinc-200 rounded-3xl ">
        <div className=" bg-gradient-to-l from-pink-500 to-orange-400 shadow-lg shadow-pink-800 rounded-3xl text-white text-center" style={style}>
          {done}
        </div>
      </div>
    )
  }

  function ProfileCard({ user }) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Bio</h3>
          <p className="text-gray-800">{user.bio}</p>
        </div>
        <div class="flex justify-between mt-4 mb-1">
          <span class="text-base font-medium text-blue-700 dark:text-white">
            Progress {user.moudul}
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {user.progress}
          </span>
        </div>
        <Progress done={user.progress}/>
      </div>
    );
  }
  return (
    <Sidebar>
      <div className="container mx-auto p-4">
        <ProfileCard user={user} />
      </div>
    </Sidebar>
  );
};

export default ViewStudent;
