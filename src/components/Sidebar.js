import { useState } from "react";
import {
  FaHome,
  FaTrophy,
  FaBook,
  FaBuffer,
  FaChartBar,
} from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import { decodeToken } from "react-jwt";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const decode = decodeToken(token);
  const name = decode.username;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const Menus = [
    { title: "Home", icon: <FaHome />, path: "/home" },
    { title: "Kursus", icon: <FaBook />, path: "/course" },
    { title: "Alur Pembelajaran", icon: <FaBuffer />, path: "/path" },
    { title: "Progres", icon: <FaChartBar />, path: "/progres" },
    { title: "Klasemen", icon: <FaTrophy />, path: "/leaderboard" },
  ];

  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-blue-200 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-2 py-2 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <IoIosSchool className="cursor-pointer text-4xl block float-left text-indigo-900 duration-500" />
              <span class="p-1 self-center text-indigo-900 text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Educate
              </span>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ml-3">
                <div class="p-2 font-medium text-indigo-900 dark:text-white">
                  <div>{name}</div>
                </div>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  class="flex text-sm mr-2 bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                >
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_GRCBh9FjvL9md2AkMAFZ3_JpwCTs5ziVw&usqp=CAU"
                  />
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  class="flex text-sm p-1 text-white bg-blue-600 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                >
                  Logout
                </button>
                {isOpen && (
                  <div
                    class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                    >
                    <div class="px-4 py-3" role="none">
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        Neil Sims
                      </p>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <div
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </div>
                      </li>
                      <li>
                        <div
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </div>
                      </li>
                      <li>
                        <div
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Earnings
                        </div>
                      </li>
                      <li>
                        <div
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </div>
                      </li>
                    </ul>
                  </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <divside
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-700 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <ul className="pt-2 pl-2">
          {Menus.map((Menu, index) => (
            <Link to={Menu.path} key={index} className=" active:bg-blue-100">
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-indigo-700 hover:text-blue-400
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <span className="text-xl block float-left pr-2">
                  {Menu.icon ? Menu.icon : <FaHome />}
                </span>
                <span className=" origin-left duration-200">{Menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </divside>
    </>
  );
};
export default Sidebar;
