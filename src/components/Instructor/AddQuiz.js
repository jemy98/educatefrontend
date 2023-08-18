import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Sidebar from "./Sidebar";

const AddQuiz = () => {
  const [name, setName] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const cid = localStorage.getItem("courseid");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response= await axios.post("http://localhost:3500/quiz", {
        quizname: name,
        courseid:cid
      });
      navigate("/instructor/addquestion",{
        state: {
          userid: response.data.qid,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div class="container p-5">
            <form onSubmit={handleSubmit}>
              <label class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Judul Quiz:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="block w-full p-2 text-gray-900 border border-gray-100 rounded-lg bg-blue-100 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
              />
              <br />
              <button
                type="submit"
                class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Question
              </button>
            </form>
        </div>
      </div>
    </>
  );
};

export default AddQuiz;
