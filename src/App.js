import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Register from "./components/Register";
import List from "./components/List";
import Home from "./components/Home";
import Course from "./components/Course";
import CoursebyLevel from "./components/CoursebyLevel";
import Progres from "./components/Progres";
import ProgressCourse from "./components/ProgressCourse";
import Path from "./components/Path";
import Modul from "./components/Modul";
import Leaderboard from "./components/Leaderboard";
import Instructor from "./components/Instructor/Home";
import AddCourse from "./components/Instructor/AddCourse";
import EditCourse from "./components/Instructor/EditCourse";
import AddModul from "./components/Instructor/AddModul";
import AddQuiz from "./components/Instructor/AddQuiz";
import EditModul from "./components/Instructor/EditModul";
import AddQuestion from "./components/Instructor/AddQuestionForm";
import StudentList from "./components/Instructor/StudentList";
import CourseList from "./components/Instructor/CourseList";
import ModulList from "./components/Instructor/ModulList";
import ViewStudent from "./components/Instructor/ViewStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/progres" element={<Progres />} />
        <Route path="/progrescourse" element={<ProgressCourse />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/course" element={<Course />} />
        <Route path="/coursebylevel" element={<CoursebyLevel />} />
        <Route path="/list" element={<List />} />
        <Route path="/path" element={<Path />} />
        <Route path="/modul" element={<Modul />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/instructor/course" element={<CourseList />} />
        <Route path="/instructor/modul" element={<ModulList />} />
        <Route path="/instructor/student" element={<StudentList />} />
        <Route path="/instructor/viewstudent" element={<ViewStudent />} />
        <Route path="/instructor/addcourse" element={<AddCourse />} />
        <Route path="/instructor/editcourse" element={<EditCourse />} />
        <Route path="/instructor/addmodul" element={<AddModul />} />
        <Route path="/instructor/editmodul" element={<EditModul />} />
        <Route path="/instructor/addquiz" element={<AddQuiz />} />
        <Route path="/instructor/addquestion" element={<AddQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
