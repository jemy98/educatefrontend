import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);
  const [dataq, setDataQuiz] = useState([]);
  const [study, setStudy] = useState([]);
  const [total, setTotal] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("cid");
  const progres = localStorage.getItem("progres");
  const sid = localStorage.getItem("sid");
  const header = { cid: id };
  useEffect(() => {
    getData();
    getDataQuiz();
    getTotal();
    getStudy();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/modul/course", {
        headers: header,
      });
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const getStudy = async () => {
    try {
      const response = await axios.get("http://localhost:3500/study/id", {
        headers: {id:sid},
      });
      setStudy(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  let prog=study.progressmodul+study.progressquiz
  localStorage.setItem("progres",prog)
  const getTotal = async () => {
    try {
      const response = await axios.get("http://localhost:3500/modul/total", {
        headers: header,
      });
      setTotal(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const getDataQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:3500/quiz/course", {
        headers: header,
      });
      setDataQuiz(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleModulid = (id) => {
    localStorage.setItem("mid", id);
    navigate("/modul");
  };
  const handleQuizid = (id) => {
    localStorage.setItem("qid", id);
    navigate("/quiz");
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div className="container flex w-full mx-28 mt-10 py-5">
          <ul class="space-y-4 w-72">
          <h1 class="p-2 text-2xl text-blue-800 font-bold dark:text-white">
            MODUL
          </h1>
            {data.map((item, index) => (
              <li>
                {index < progres ? (
                  <button
                    class="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
                    role="alert"
                    onClick={() => handleModulid(item._id)}
                  >
                    <div class="flex items-center justify-between">
                      <span class="sr-only">User info</span>
                      <h3 class="font-medium">{item.modulname}</h3>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </div>
                  </button>
                ) : index == progres ? (
                  <button
                    class="w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400"
                    role="alert"
                    onClick={() => handleModulid(item._id)}
                  >
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">
                        {item.modulname}
                      </h3>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <div
                    class="w-full p-4 text-gray-500 bg-gray-300 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    role="alert"
                  >
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">{item.modulname} </h3>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <ul class="ml-14 space-y-4 w-72">
          <h1 class="p-2 text-2xl text-blue-800 font-bold dark:text-white">
            QUIZ
          </h1>
            {dataq.map((item, index) => (
              <li>
                {index < (progres-total) ? (
                  <button
                    class="w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
                    role="alert"
                    onClick={() => handleQuizid(item._id)}
                  >
                    <div class="flex items-center justify-between">
                      <span class="sr-only">User info</span>
                      <h3 class="font-medium">{item.quizname}</h3>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </div>
                  </button>
                ) : index == (progres-total) ? (
                  <button
                    class="w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400"
                    role="alert"
                    onClick={() => handleQuizid(item._id)}
                  >
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">
                        {item.quizname} {total}
                      </h3>
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <div
                    class="w-full p-4 text-gray-500 bg-gray-300 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    role="alert"
                  >
                    <div class="flex items-center justify-between">
                      <h3 class="font-medium">{item.quizname} </h3>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default List;
