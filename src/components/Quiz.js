import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

const Quiz = () => {
  const questions = [
    {
      question: 'I am planning to go to the party tonight but it is not raining. It’s raining very hard now. I wish …."',
      answerOptions: [
        { answerText: "It had stopped", isCorrect: false },
        { answerText: "It stops", isCorrect: false },
        { answerText: "It would stop", isCorrect: true },
        { answerText: "It will stop", isCorrect: false },
      ],
    },
    {
      question: '“Let’s go swimming.” I wish I .... We have a test next Tuesday."?',
      answerOptions: [
        { answerText: "could be", isCorrect: false },
        { answerText: "am able to", isCorrect: false },
        { answerText: "be able to", isCorrect: false },
        { answerText: "could", isCorrect: true },
      ],
    },
    {
      question: "Your sister always gets up late on Sundays, …?",
      answerOptions: [
        { answerText: "doesn’t she", isCorrect: true },
        { answerText: "isn’t it", isCorrect: false },
        { answerText: "does it", isCorrect: false },
        { answerText: "will she", isCorrect: false },
      ],
    },
    {
      question: "My Math teacher may … us writing test tomorrow so have to make preparation for it??",
      answerOptions: [
        { answerText: "gives", isCorrect: false },
        { answerText: "give", isCorrect: true },
        { answerText: "given", isCorrect: false },
        { answerText: "gave", isCorrect: false },
      ],
    },
    {
      question: "My uncle works hard night and day because he … support his family economy",
      answerOptions: [
        { answerText: "have to", isCorrect: true },
        { answerText: "had", isCorrect: false },
        { answerText: "have", isCorrect: false},
        { answerText: "has to", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousButtonClick = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
    }
  };

  const token = localStorage.getItem("token");
  const decode = decodeToken(token);
  const userid = decode._id;
  const navigate= useNavigate();
  const sid = localStorage.getItem("sid");
  const cid = localStorage.getItem("cid");

  const updateProgress = async () => {
    try {
      await axios.patch(
        "http://localhost:3500/study/progressquiz",
        {
          id:sid,
          courseid:cid
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestartButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("http://localhost:3500/users/score", {
        id:userid,
        score:score
      });
    } catch (error) {
      console.log(error);
    }
    updateProgress();
    navigate('/list');
  };

  return (
    <>
      <Sidebar></Sidebar>
      <div className="p-5 sm:ml-64">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="container mx-auto">
            {showScore ? (
              <div className="bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-3xl text-center font-bold mb-4">
                  Your final score is {score} out of {questions.length}
                </h2>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleRestartButtonClick}
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div className="bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                <h3 className="text-xl mb-4">
                  {questions[currentQuestion].question}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion].answerOptions.map(
                    (answerOption) => (
                      <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect)
                        }
                        key={answerOption.answerText}
                      >
                        {answerOption.answerText}
                      </button>
                    )
                  )}
                </div>
                {/* <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePreviousButtonClick}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                handleAnswerOptionClick(
                  questions[currentQuestion].answerOptions[0].isCorrect
                )
              }
            >
              Skip
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                handleAnswerOptionClick(
                  questions[currentQuestion].answerOptions[1].isCorrect
                )
              }
            >
              Next
            </button>
          </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
