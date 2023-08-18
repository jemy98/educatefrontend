import React from "react";
import { useState,useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Sidebar from "./Sidebar";
import { Link,useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative mt-3 w-30 h-6 bg-zinc-200 rounded-3xl">
      <div
        className="absolute top-0 left-0 h-6 bg-gradient-to-l from-pink-500 to-orange-400 shadow-lg shadow-pink-800 rounded-3xl text-white text-center transition-all duration-300"
        style={{ width: `${percentage}%` }}
      >
        <div className="flex items-center justify-center h-6 text-white text-sm font-bold">
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

const Progres = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = decodeToken(token);
  const userid = decode._id;
  const header = { userid: userid };
  useEffect(() => {
    getData();
    // getTotal();
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
  let total= 0;
  
  const getTotal = async (id) => {
    try {
      let response=await axios.get("http://localhost:3500/modul/total", {
        cid: id,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div class="container mx-auto px-10 xl:px-48">
          <div class="flex-col space-y-5 md:grid-cols-2 xl:grid-cols-3 pt-20 pb-10 lg:pt-20 lg:pb-20">
          {data.map((item, index) => (
            <div class="p-2 bg-indigo-600 h-24 w-3/4 rounded-2xl shadow-lg shadow-blue-500">
              <div className="mt-2 mb-2 text-white">
                {item.courseid.coursename}
                <Link to="/list">
                  <div className="float-right px-2 bg-blue-900 cursor-pointer rounded-lg text-lg text-center">
                    Lihat
                  </div>
                </Link>
                <p className="float-right mr-4"> {item.progressmodul+item.progressquiz}/6</p>
              </div>
              <ProgressBar percentage={(item.progressmodul+item.progressquiz)/6*100} />
            </div>
            
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Progres;
