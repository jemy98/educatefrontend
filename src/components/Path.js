import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Path = () => {
  const navigate = useNavigate();
  const handleLevel = (lvl) => {
    navigate("/coursebylevel", {
      state: {
        level: lvl,
      },
    });
  };
  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div class="antialiased bg-blue-400 text-gray-800">
          <div class="relative container mx-auto px-6 flex flex-col space-y-8">
            <div class="absolute z-0 w-2 h-full bg-white shadow-md inset-0 left-17 md:mx-auto md:right-0 md:left-0"></div>
            <div class="relative z-10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1903/1903162.png"
                alt=""
                class="h-24 w-24 object-cover rounded-full shadow-md border-4 border-white xs:absolute md:mx-auto md:left-0 md:right-0"
              />
              <div class="relative pt-2 xs:pl-28 xs:pt-0 md:w-1/2 md:ml-auto md:pl-16">
                <div
                  class="absolute inset-0 left-10 h-4 w-4 transform rotate-45 bg-white xs:top-11 xs:left-26 md:left-14"
                  aria-hidden="true"
                ></div>
                <div class="bg-white p-6 rounded-md shadow-md">
                  <span class="font-bold text-indigo-600 text-sm tracking-wide">
                    25 Hours
                  </span>
                  <h1 class="text-2xl font-bold pt-1">
                    Beginner
                    <div
                      onClick={() => handleLevel("Beginner")}
                      className="float-right px-2 font-medium bg-blue-500 cursor-pointer rounded-lg text-white text-xl hover:bg-blue-800 text-center"
                    >
                      Lihat
                    </div>
                  </h1>
                  <p class="pt-1">
                    Seseorang yang berada di level ini mempunyai kemampuan
                    bahasa Inggris yang masih sangat dasar. Pemahaman dan
                    penggunaan bahasa Inggris hanya seputar kosa kata yang umum
                    dan kalimat yang sederhana.
                  </p>
                </div>
              </div>
            </div>
            <div class="relative z-10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/562/562132.png"
                alt=""
                class="h-24 w-24 object-cover rounded-full shadow-md border-4 border-white xs:absolute md:mx-auto md:left-0 md:right-0"
              />
              <div class="relative pt-2 xs:pl-28 xs:pt-0 md:w-1/2 md:ml-0 md:mr-auto md:pl-0 md:pr-16">
                <div
                  class="absolute inset-0 left-10 h-4 w-4 transform rotate-45 bg-white xs:top-11 xs:left-26 md:left-auto md:right-14"
                  aria-hidden="true"
                ></div>
                <div class="bg-white p-6 rounded-md shadow-md">
                  <span class="font-bold text-indigo-600 text-sm tracking-wide">
                    35 hours
                  </span>
                  <h1 class="text-2xl font-bold pt-1">
                    Intermediate{" "}
                    <div
                      onClick={() => handleLevel("Intermediate")}
                      className="float-right px-2 font-medium bg-blue-500 cursor-pointer rounded-lg text-white text-xl hover:bg-blue-800 text-center"
                    >
                      Lihat
                    </div>
                  </h1>
                  <p class="pt-1">
                    Pada level ini, seseorang bisa berbahasa Inggris secara
                    pasif dan aktif dengan topik yang lebih variatif daripada
                    level sebelumnya, baik dalam situasi informal maupun formal
                    (tetapi terbatas). Contohnya dapat bercakap-cakap tentang
                    cita-cita dan gaya hidup, hingga mengikuti wawancara kerja
                    dalam bahasa Inggris.
                  </p>
                </div>
              </div>
            </div>
            <div class="relative z-10">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6_z6gLec2eAxvQunbZfAlvJXV_FkGYx891AXXbk9oesdMcm5MSuab2jKVBUwE0r8v1b0&usqp=CAU"
                alt=""
                class="h-24 w-24 object-cover rounded-full shadow-md border-4 border-white xs:absolute md:mx-auto md:left-0 md:right-0"
              />
              <div class="relative pt-2 pb-3 xs:pl-28 xs:pt-0 md:w-1/2 md:ml-auto md:pl-16">
                <div
                  class="absolute inset-0 left-10 h-4 w-4 transform rotate-45 bg-white xs:top-11 xs:left-26 md:left-14"
                  aria-hidden="true"
                ></div>
                <div class="bg-white p-6 rounded-md shadow-md">
                  <span class="font-bold text-indigo-600 text-sm tracking-wide">
                    40 hours
                  </span>
                  <h1 class="text-2xl font-bold pt-1">
                    Advance
                    <div
                      onClick={() => handleLevel("Advanced")}
                      className="float-right px-2 font-medium bg-blue-500 cursor-pointer rounded-lg text-white text-xl hover:bg-blue-800 text-center"
                    >
                      Lihat
                    </div>
                  </h1>
                  <p class="pt-1">
                    Apabila seseorang menduduki level ini, artinya ia bisa
                    menggunakan bahasa Inggris untuk kepentingan akademis dan
                    profesional. Tidak ada lagi kesulitan untuk memahami ataupun
                    menerapkan bahasa Inggris dalam hampir semua kesempatan. Ia
                    dapat mengemukakan gagasannya dalam bentuk lisan dan
                    tertulis terkait beragam topik dengan spontan, fasih, dan
                    percaya diri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Path;
