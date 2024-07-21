import React, { useState, useEffect } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { NavLink } from 'react-router-dom';
import { TiArrowBack, TiChevronRight, TiChevronLeft } from 'react-icons/ti';

const questions = [
  {
    image: 'https://via.placeholder.com/150',
    question: 'What is the primary purpose of a business?',
    options: [
      'To generate profit',
      'To provide jobs',
      'To serve the community',
      'To innovate',
    ],
    answer: 'To provide jobs',
  },
  {
    image: 'https://via.placeholder.com/150',
    question: 'What is the primary purpose of a business?',
    options: [
      'To generate profit',
      'To provide jobs',
      'To serve the community',
      'To innovate',
    ],
    answer: 'To provide jobs',
  },
  {
    image: 'https://via.placeholder.com/150',
    question: 'What is the primary purpose of a business?',
    options: [
      'To generate profit',
      'To provide jobs',
      'To serve the community',
      'To innovate',
    ],
    answer: 'To provide jobs',
  },
  // Add more questions here
];

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuizForStudentsBusiness: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([...questions]);

  useEffect(() => {
    const shuffled = questions.map((question) => ({
      ...question,
      options: shuffleArray([...question.options]),
    }));
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerOptionClick = (option: string) => {
    if (option === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
  };

  return (
    <DefaultLayoutStudent>
      <div className="container mx-auto p-4 w-2/3">
        <div className="inline-block mb-6">
          <NavLink
            to="/dashboard/student/quiz"
            className="flex flex-row items-center inline-block bg-blue-600 rounded text-center hover:bg-blue-800 p-2 text-white"
          >
            <span className="me-2">
              <TiArrowBack />
            </span>
            Go back
          </NavLink>
        </div>
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              You scored {score} out of {shuffledQuestions.length}
            </h2>
            <p className="text-lg">
              Percentage: {(score / shuffledQuestions.length) * 100}%
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <img
                src={shuffledQuestions[currentQuestion].image}
                alt="Question"
                className="mx-auto"
              />
            </div>
            <h2 className="text-xl font-bold mb-4">
              {shuffledQuestions[currentQuestion].question}
            </h2>
            <p className="text-lg mb-4">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </p>
            <div className="space-y-2">
              {shuffledQuestions[currentQuestion].options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(option)}
                    className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousQuestion}
                className={` flex flex-row items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-700 ${
                  currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'bg-blue-500'
                }`}
                disabled={currentQuestion === 0}
              >
                <span>
                  <TiChevronLeft />
                </span>
                Previous
              </button>
              <button
                onClick={handleFinishQuiz}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Finish Now
              </button>
              {currentQuestion < shuffledQuestions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="flex flex-row items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Next
                  <span>
                    <TiChevronRight />
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  Finish Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </DefaultLayoutStudent>
  );
};

export default QuizForStudentsBusiness;
