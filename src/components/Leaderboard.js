import React, { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = decodeToken(token);
  const userid = decode._id;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/users/score");
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div class="container p-5">
          <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="pr-2 py-3">
                      Rank
                    </th>
                    <th scope="col" class="px-6 py-3">
                      User
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((player, index) => (
                    <tr
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={player.username}
                    >
                      <td class="px-3 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_GRCBh9FjvL9md2AkMAFZ3_JpwCTs5ziVw&usqp=CAU"
                          className="w-10 h-10 rounded-full"
                        />
                        <div class="pl-3">
                          <div class="text-base font-semibold">
                            {player.username}
                          </div>
                        </div>
                      </th>
                      <td class="px-6 py-4">{player.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
