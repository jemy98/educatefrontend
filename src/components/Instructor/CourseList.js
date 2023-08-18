import React, { useState, useEffect } from "react";
import Sidebar from "../Instructor/Sidebar";
import { FaPlus } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black">
      <div className="modal bg-white shadow-lg rounded w-1/3 mx-auto mt-20 p-6">
        <p className="text-center text-lg mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const decode = decodeToken(token);
  const header = { instid: decode._id };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/courses/instructor",
        { headers: header }
      );
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const handleSelectid = (id) => {
    localStorage.setItem("courseid", id);
    navigate("/instructor/modul");
  };
  const handleEdit = (id) => {
    localStorage.setItem("courseid", id);
    navigate("/instructor/editcourse");
  };
  const handleStudent = (id) => {
    localStorage.setItem("courseid", id);
    navigate("/instructor/student");
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete("http://localhost:3500/courses", { data: { id: id } });
      getData();
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
                <Link to="/instructor/addcourse">
                  <button className="inline-flex items-center px-3 py-2 mb-3 mr-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FaPlus />
                    New course
                  </button>
                </Link>
              </div>
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Course name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Student
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
                      {item.coursename}
                    </th>
                    <td className="px-6 py-4">{item.level}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStudent(item._id)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleSelectid(item._id)}
                        type="button"
                        className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(item._id)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(item._id)}
                        type="button"
                        className="text-white float-right bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseList;
