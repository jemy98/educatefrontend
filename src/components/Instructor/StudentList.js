import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const StudentList = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState("");
  const [ids, setIds] = useState("");
  let id = localStorage.getItem("courseid");
  const headers = { cid: id };
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/study/course", {
        headers: headers,
      });
      setData(response.data);
    } catch (error) {
      // Handle error if needed
    }
  };
  const handleConfirmStudent = (id) => {
    localStorage.setItem("courseid", id);

    getData();
    navigate("/instructor/student");
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("http://localhost:3500/study", {
        studyid: ids,
      });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (id) => {
    setIds(id);
    setIsOpen(true);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div className="container p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Confirm
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_GRCBh9FjvL9md2AkMAFZ3_JpwCTs5ziVw&usqp=CAU"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {item.studentid.username}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {item.status ? (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-400 mr-2"></div>{" "}
                          Waiting
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.status ? (
                        <div
                        className="text-white w-24 bg-blue-500 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Accepted
                      </div>
                      ) : (
                        <button
                          onClick={() => handleModal(item._id)}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                    {/* <td className="px-6 py-4">
                      <Link to="/leaderboard">
                      <button
                        type="button"
                        className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        VIew
                      </button>
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4">
                Are you sure you want to accept this student?
              </p>
              <div className="flex justify-end space-x-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  class="text-gray-500 bg-white hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No
                </button>
                <button
                  onClick={handleAccept}
                  type="button"
                  class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
