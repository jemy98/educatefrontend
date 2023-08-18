import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { decodeToken } from "react-jwt";
import axios from "axios";

const Home = () => {
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
      const response = await axios.get("http://localhost:3500/courses/", {});
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3500/study", {
        studentid: userid,
        courseid: id,
      });
      navigate("/course");
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (id) => {
    setId(id);
    setIsOpen(true);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div class="container flex flex-wrap">
          {data.map((item) => (
            <div class="h-46 lg:w-1/3 m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              {item.image ? (
                <img
                  class="p-3 h-36 w-44"
                  src={`http://localhost:3500/${item.image}`}
                />
              ) : (
                <img
                  class="p-3 h-36 w-44"
                  src={`https://cdn-icons-png.flaticon.com/512/2232/2232688.png`}
                />
              )}
              <div class=" ml-3 text-sm">
                Level : {item.level}
                <div class=" float-right mr-3 text-center text-sm">
                  Oleh : {item.instructorid.username}
                </div>
              </div>
              <div class="px-3 mx-auto">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.coursename}
                </h5>
                <p class="mb-3 h-10 font-normal text-sm text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <button
                  onClick={() => handleModal(item._id)}
                  class="inline-flex justify-end px-3 py-2 mb-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Course
                </button>
              </div>
            </div>
          ))}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">Kamu yakin ingin mengambil kursus ini?</p>
                <div className="flex justify-end space-x-5">
                  <button
                    type="button"
                    onClick={handleCancel}
                    class="text-gray-500 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Tidak
                  </button>
                  <button
                    onClick={handleAccept}
                    type="button"
                    class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yakin
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
