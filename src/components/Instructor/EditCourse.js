import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";
import Sidebar from "./Sidebar";

const EditCourse = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = decodeToken(token);
  const instructorid = decode._id;
  const cid = localStorage.getItem("courseid");

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3500/courses/id", {
        headers: {id:cid},
      });
      setName(response.data.coursename);
      setMessage(response.data.description);
      setLevel(response.data.level);
      setFile(response.data.image);
    } catch (error) {
      // Handle error if needed
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("http://localhost:3500/courses", {
      id:cid,  
      coursename: name,
      level: level,
      description: message,
      },
      );
      navigate("/instructor/course");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
      <div class="container p-5">
          <form onSubmit={handleSubmit}>
            <label class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Judul Course:
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
            <label class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Level Course:
            </label>
            <select
              id="countries"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>
            <br />
            <label class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Deskripsi Course:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              class="w-full bg-blue-100 px-0 text-md text-gray-900 bg- border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write description..."
              required
            />
            <br />
            <br />
            <label
              class="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload Gambar
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              onChange={handleFileChange}
              type="file"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, PNG, JPG.
            </p>
            {file ? (
              <div className="">
                <label>Preview Image</label>
                <img
                  class="p-3 max-h-64"
                  src={`http://localhost:3500/${file}`}
                />
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Submit
            </button>
          </form>
        {/* )} */}
      </div>
    </div>
    </>
  );
};

export default EditCourse;
