import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const AddQuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [quizid,setquizid]=useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const location = useLocation();
  const qid = location.state.userid;
  const [errors, setErrors] = useState({
    question: false,
    options: [false, false, false, false],
  });

  const addQuestion = () => {
    if (currentQuestion.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, question: true }));
      return;
    }

    const trimmedOptions = options.map((option) => option.trim());
    if (trimmedOptions.some((option) => option === "")) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        options: trimmedOptions.map((option) => option === ""),
      }));
      return;
    }

    const newQuestion = {
      quizid:qid,
      question: currentQuestion,
      options: trimmedOptions,
      correctOption: correctOption,
    };

    if (editMode) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditMode(false);
      setEditIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    setCurrentQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
    setErrors({ question: false, options: [false, false, false, false] });
  };

  const editQuestion = (index) => {
    const selectedQuestion = questions[index];
    setCurrentQuestion(selectedQuestion.question);
    setOptions(selectedQuestion.options);
    setCorrectOption(selectedQuestion.correctOption);
    setEditMode(true);
    setEditIndex(index);
    setErrors({ question: false, options: [false, false, false, false] });
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: [...prevErrors.options, false],
    }));
  };

  const editOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: prevErrors.options.map((error, i) =>
        i === index ? false : error
      ),
    }));
  };

  const deleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);

    if (correctOption === index) {
      setCorrectOption(0);
    } else if (correctOption > index) {
      setCorrectOption(correctOption - 1);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      options: prevErrors.options.filter((_, i) => i !== index),
    }));
  };
  const navigate=useNavigate();
  const submitQuiz = () => {
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    // Prepare the data for submission
    const data = {
      quizdata: questions,
    };
    navigate('/instructor/modul')
    // Send the data to the backend API endpoint
    axios
      .post("http://localhost:3500/quiz/question", data)
      .then((response) => {
        if (response.status === 200) {
          alert("Quiz submitted successfully!");
          setQuestions([]);
        } else {
          alert("Failed to submit quiz.");
        }
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
        alert("An error occurred while submitting the quiz.");
      });
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div className="container mx-auto mt-4">
          <h1 className="text-2xl font-bold mb-4">Quiz Maker</h1>
          <div className="mb-4">
            <label className="font-bold">Question: {qid} </label>
            <input
              type="text"
              className={`border ${
                errors.question ? "border-red-500" : "border-gray-300"
              } p-2 rounded-md w-full`}
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
            {errors.question && (
              <p className="text-red-500 mt-1">Please enter a question.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-bold">Options:</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  className={`border ${
                    errors.options[index] ? "border-red-500" : "border-gray-300"
                  } p-2 rounded-md w-full mt-2`}
                  value={option}
                  onChange={(e) => editOption(index, e.target.value)}
                />
                <button
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteOption(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            {errors.options.some((error) => error) && (
              <p className="text-red-500 mt-1">Please enter all options.</p>
            )}
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addOption}
            >
              Add Option
            </button>
          </div>
          <div className="mb-4">
            <label className="font-bold">Correct Option:</label>
            <select
              className="border border-gray-300 p-2 rounded-md w-full"
              value={correctOption}
              onChange={(e) => setCorrectOption(parseInt(e.target.value))}
            >
              {options.map((option, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addQuestion}
          >
            {editMode ? "Update Question" : "Add Question"}
          </button>
          {editMode && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => {
                setEditMode(false);
                setEditIndex(null);
                setCurrentQuestion("");
                setOptions(["", "", "", ""]);
                setCorrectOption(0);
                setErrors({
                  question: false,
                  options: [false, false, false, false],
                });
              }}
            >
              Cancel
            </button>
          )}
          <h2 className="text-xl font-bold mt-4 mb-4">Questions:</h2>
          {questions.map((question, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md mt-2"
            >
              <h3 className="font-bold">{question.question}</h3>
              <ul className="mt-2">
                {question.options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    className={
                      optionIndex === question.correctOption
                        ? "font-bold text-blue-700"
                        : ""
                    }
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => editQuestion(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteQuestion(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {questions.length > 0 && (
            <button
              className="mt-4 float-right bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={submitQuiz}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddQuestionForm;
