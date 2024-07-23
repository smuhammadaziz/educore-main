import React, { useState, useEffect } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { NavLink } from 'react-router-dom';
import { TiArrowBack, TiChevronRight, TiChevronLeft } from 'react-icons/ti';
import backurl from '../../../../links';

import image1 from '../../../../images/economics/1.png';
import image2 from '../../../../images/economics/2.png';
import image3 from '../../../../images/economics/3.png';
import image4 from '../../../../images/economics/4.png';
import image5 from '../../../../images/economics/5.png';
import image6 from '../../../../images/economics/6.png';
import image7 from '../../../../images/economics/7.png';
import image8 from '../../../../images/economics/8.png';
import image9 from '../../../../images/economics/9.png';
import image10 from '../../../../images/economics/10.png';

const questions = [
  {
    image: image1,
    options: ['A', 'B', 'C', 'D'],
    answer: 'B',
  },
  {
    image: image2,
    options: ['A', 'B', 'C', 'D'],
    answer: 'C',
  },
  {
    image: image3,
    options: ['A', 'B', 'C', 'D'],
    answer: `C`,
  },
  {
    image: image4,
    options: ['A', 'B', 'C', 'D'],
    answer: `D`,
  },
  {
    image: image5,
    options: ['A', 'B', 'C', 'D'],
    answer: `B`,
  },
  {
    image: image6,
    options: ['A', 'B', 'C', 'D'],
    answer: `B`,
  },
  {
    image: image7,
    options: ['A', 'B', 'C', 'D'],
    answer: `C`,
  },
  {
    image: image8,
    options: ['A', 'B', 'C', 'D'],
    answer: `A`,
  },
  {
    image: image9,
    options: ['A', 'B', 'C', 'D'],
    answer: `D`,
  },
  {
    image: image10,
    options: ['A', 'B', 'C', 'D'],
    answer: `A`,
  },

  // Add more questions here
];
// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Shuffling the questions and options before setting the state
const getShuffledQuestions = () => {
  return shuffleArray([...questions]).map((question) => ({
    ...question,
    options: shuffleArray([...question.options]),
  }));
};

const QuizForEconomicsStudent: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>(
    getShuffledQuestions(),
  );
  const [finished, setFinished] = useState(false);
  const [Nfinished, setNfinished] = useState(false);

  const token = localStorage.getItem('TOKEN');

  const handleSubmit = async (finish: boolean, Nfinished: boolean) => {
    // Create a form data object
    const formData = new FormData();
    formData.append('correct', score.toString());
    formData.append('incorrect', (shuffledQuestions.length - score).toString());
    formData.append('finish', JSON.stringify(finish));
    formData.append('Nfinished', JSON.stringify(Nfinished));
    formData.append('subject', 'A-LEVEL ECONOMICS');

    try {
      const response = await fetch(`${backurl}api/quiz/add/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log(response);
    } catch (error: any) {
      console.error('Error submitting the quiz', error);
    }
  };

  const handleAnswerOptionClick = (option: string) => {
    if (option === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      setFinished(true);
      handleSubmit(true, false);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      setFinished(true);
      handleSubmit(true, false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
    setFinished(true);
    handleSubmit(true, false);
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setShuffledQuestions(getShuffledQuestions());
    setFinished(false);
    setNfinished(false);
  };

  useEffect(() => {
    const handleUnload = () => {
      if (!finished) {
        setNfinished(true);
        handleSubmit(false, true);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [finished]);

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
            <button
              onClick={handleRetryQuiz}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Retry Test
            </button>
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
            {/* <h2 className="text-xl font-bold mb-4">
              {shuffledQuestions[currentQuestion].question}
            </h2>
            <h2 className="text-xl font-bold mb-4">
              {shuffledQuestions[currentQuestion].questions}
            </h2> */}
            <p className="text-lg mb-4">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </p>
            <div className="space-y-2">
              {shuffledQuestions[currentQuestion].options.map(
                (option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(option)}
                    className="block w-full px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousQuestion}
                className={`flex flex-row items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-gray-700 ${
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

export default QuizForEconomicsStudent;
