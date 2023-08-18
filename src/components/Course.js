import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";
import Sidebar from "../components/Sidebar";

const Course = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = decodeToken(token);
  const userid = decode._id;
  const header = { userid: userid };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/courses/study", {
        headers: header,
      });
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  const handlecourseid = (id,prog,sid) => {
    localStorage.setItem("cid", id);
    localStorage.setItem("progres", prog);
    localStorage.setItem("sid", sid)
    navigate("/list");
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div class="container flex flex-wrap">
          {data.map((item) => (
            <div class="h-46 lg:w-1/3 m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              {item.courseid.image ? (
                <img
                  class="p-3 h-36 w-44"
                  src={`http://localhost:3500/${item.courseid.image}`}
                />
              ) : (
                <img
                  class="p-3 h-36 w-44"
                  src={`https://cdn-icons-png.flaticon.com/512/2232/2232688.png`}
                />
              )}
              <div class=" ml-3 text-sm">
                Level : {item.courseid.level}
              </div>
              <div class="px-3 mx-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.courseid.coursename}
                </h5>
                <p class="mb-3 h-10 font-normal text-sm text-gray-700 dark:text-gray-400">
                  {item.courseid.description}
                </p>
                {item.status ? (
                  <button
                    onClick={() => handlecourseid(item.courseid._id,item.progressmodul + item.progressquiz,item._id)}
                    class="inline-flex justify-end px-3 py-2 mb-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Belajar
                  </button>
                ) : (
                  <div
                  class="inline-flex justify-end px-3 py-2 mb-3 text-sm font-medium text-center text-white bg-blue-300 rounded-lg dark:bg-blue-600 "
                >
                  Menunggu
                </div>
                )}
              </div>
              {/* )} */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
