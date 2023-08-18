import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Sidebar from "./Sidebar";

const ModulList = () => {
  const [data, setData] = useState([]);
  const [dataq, setDataq] = useState([]);
  const location = useLocation();
  let id = localStorage.getItem("courseid");
  const headers = { cid: id };
  useEffect(() => {
    getDatab();
    getDataq();
  }, []);
  const getDatab = async () => {
    try {
      const response = await axios.get("http://localhost:3500/modul/course", {
        headers: headers,
      });
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const getDataq = async () => {
    try {
      const response = await axios.get("http://localhost:3500/quiz/course", {
        headers: headers,
      });
      setDataq(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const navigate = useNavigate();
  const handleQuizid = (id) => {
    navigate("/instructor/addquestion", {
      state: {
        userid: id,
      },
    });
  };

  const handleModulid = (id) => {
    navigate("/instructor/editmodul", {
      state: {
        userid: id,
      },
    });
  };

  const deleteModul = async (id) => {
    try {
      await axios.delete("http://localhost:3500/modul", { data: { id: id } });
      getDatab();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await axios.delete("http://localhost:3500/quiz", { data: { id: id } });
      getDataq();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div className="container p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <div className="absolute top-0 right-0">
                <Link to="/instructor/addmodul">
                  <button className="inline-flex items-center px-3 py-2 mb-3 mr-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FaPlus />
                    New Modul
                  </button>
                </Link>
                <Link to="/instructor/addQuiz">
                  <button className="inline-flex items-center px-3 py-2 mb-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FaPlus />
                    New Quiz
                  </button>
                </Link>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Modul name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nomor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.modulname}
                    </th>
                    <td className="px-6 py-4">{item.no}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleModulid(item._id)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteModul(item._id)}
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      QUIZ
                    </th>
                    <td className="px-6 py-1"></td>
                    <td className="px-6 py-1">
                    </td>
                  </tr>
                {dataq.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b mt- dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.quizname}
                    </th>
                    <td className="px-6 py-4">{item.no}</td>
                    <td className=" px-6 py-4">
                      <button
                        onClick={() => handleQuizid(item._id)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteQuiz(item._id)}
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="w-full mt-3 text-sm text-left text-gray-500 dark:text-gray-400">
              
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModulList;
