import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { decodeToken } from "react-jwt";

const Modul = () => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState([]);
  const [prev, setPrev] = useState([]);
  const [study, setStudy] = useState([]);
  const navigate = useNavigate();
  const mid = localStorage.getItem("mid");
  const cid = localStorage.getItem("cid");
  let progres = localStorage.getItem("progres");
  const headers = { id: mid };
  const sid = localStorage.getItem("sid");
  // const userid = decode._id;

  useEffect(() => {
    getData();
    getNextid();
    getPrevid();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/modul/id", {
        headers: headers,
      });
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  const getPrevid = async () => {
    try {
      const response = await axios.get("http://localhost:3500/modul/prev", {
        headers: headers,
      });
      setPrev(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const getNextid = async () => {
    try {
      const response = await axios.get("http://localhost:3500/modul/next", {
        headers: headers,
      });
      setNext(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  const updateProgress = async () => {
    try {
      await axios.patch("http://localhost:3500/study/progressmodul", {
        id: sid,
        courseid: cid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextid = (id) => {
    if (progres <= data.no) {
      updateProgress();
      localStorage.setItem("mid", id);
      navigate(0);
    } 
  };

  const handlePrevid = (id) => {
    localStorage.setItem("mid", id);
    navigate(0);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:mt-7 sm:ml-64">
        <div className="container">
          <h2 id="accordion-open-heading-1">
            <div class="flex items-center bg-blue-100 justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400">
              <span class="flex items-center">{data.modulname} </span>
            </div>
          </h2>
          <div>
            <div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p class="mb-2 text-gray-700 dark:text-gray-300">
                {data.description}
              </p>
            </div>
          </div>
          <div>
            <div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
              {data.image ? (
                <div>
                  <img
                    class=" max-h-80 max-w-full rounded-lg"
                    src={`http://localhost:3500/${data.image}`}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="flex justify-between rounded-md shadow-sm">
            {prev ? (
              <button
                type="button"
                onClick={() => handlePrevid(prev._id)}
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Previous
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handlePrevid(prev._id)}
                class=" text-white bg-blue-700 cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Previous
              </button>
            )}

            <button
              type="button"
              onClick={() => handleNextid(next._id)}
              class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modul;
