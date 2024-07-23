import React, { useState } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';

import image1 from '../../../../images/math/1.png';
import image2 from '../../../../images/math/2.png';
import image3 from '../../../../images/math/3.png';
import image4 from '../../../../images/math/4.png';
import image5 from '../../../../images/math/5.png';
import image6 from '../../../../images/math/6.png';
import image7 from '../../../../images/math/7.png';
import image8 from '../../../../images/math/8.png';
import image9 from '../../../../images/math/9.png';
import image10 from '../../../../images/math/10.png';

import image11 from '../../../../images/math/11.png';
import image22 from '../../../../images/math/22.png';
import image33 from '../../../../images/math/33.png';
import image44 from '../../../../images/math/44.png';
import image55 from '../../../../images/math/55.png';
import image66 from '../../../../images/math/66.png';
import image77 from '../../../../images/math/77.png';
import image88 from '../../../../images/math/88.png';
import image99 from '../../../../images/math/99.png';
import image100 from '../../../../images/math/100.png';

interface QuizQuestion {
  id: number;
  questionImage: string;
  answerImage: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    questionImage: image1,
    answerImage: image11,
  },
  {
    id: 2,
    questionImage: image2,
    answerImage: image22,
  },
  {
    id: 3,
    questionImage: image3,
    answerImage: image33,
  },
  {
    id: 4,
    questionImage: image4,
    answerImage: image44,
  },
  {
    id: 5,
    questionImage: image5,
    answerImage: image55,
  },
  {
    id: 6,
    questionImage: image6,
    answerImage: image66,
  },
  {
    id: 7,
    questionImage: image7,
    answerImage: image77,
  },
  {
    id: 8,
    questionImage: image8,
    answerImage: image88,
  },
  {
    id: 9,
    questionImage: image9,
    answerImage: image99,
  },
  {
    id: 10,
    questionImage: image10,
    answerImage: image100,
  },

  // Add more questions here
];

const QuizComponent: React.FC = () => {
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleToggleAnswer = (id: number) => {
    setShowAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <DefaultLayoutStudent>
      <div className="p-8 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-8">
          {quizData.map((question) => (
            <div
              key={question.id}
              className="p-6 bg-white border-gray-200 rounded-xl shadow-md transition-transform transform"
            >
              <div className="mb-4">
                <img
                  src={question.questionImage}
                  alt={`Question ${question.id}`}
                  className="w-full rounded-lg object-cover"
                />
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg shadow-md hover:from-green-500 focus:outline-none transition-all"
                onClick={() => handleToggleAnswer(question.id)}
              >
                {showAnswers[question.id] ? 'Hide Answer' : 'Show Answer'}
              </button>
              {showAnswers[question.id] && (
                <div className="mt-4">
                  <img
                    src={question.answerImage}
                    alt={`Answer ${question.id}`}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayoutStudent>
  );
};

export default QuizComponent;
