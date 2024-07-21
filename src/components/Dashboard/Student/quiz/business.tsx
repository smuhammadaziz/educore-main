import React, { useState, useEffect } from 'react';
import DefaultLayoutStudent from '../../../../layout/DefaultStudent';
import { NavLink } from 'react-router-dom';
import { TiArrowBack, TiChevronRight, TiChevronLeft } from 'react-icons/ti';

// Original questions array
const questions = [
  {
    image: 'https://via.placeholder.com/150',
    question: `Meditation has been around for thousands of years, starting as a religious practice. Hindu scripture from around 1500 B.C.E. describes meditating on the divine, and art from this time period shows people sitting cross-legged and solitary in a garden. In China and India around the fifth century B.C.E., other forms of meditation developed. Several religions, including Taoism, Buddhism, Islam, and Christianity, have meditative rites. In 20th-century Europe and America, secular forms of meditation arrived from India. Rather than focusing on spiritual growth, secular meditation emphasizes stress reduction, relaxation, and self-improvement. \n\n
`,
    questions: 'Which choice best states the main purpose of the text?',
    options: [
      'It discusses the history of meditation as a religious practice to illustrate how it can impact spiritual growth.',
      'It argues that religious and secular meditation improve well-being, including the regulation of the impacts of stress.',
      'It presents meditation as a practice that has been historically connected to various world religions.',
      'It describes the history of meditation, from its religious origins to its developing non-religious forms over time.',
    ],
    answer:
      'It describes the history of meditation, from its religious origins to its developing non-religious forms over time.',
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `A now-famous occurrence at the roulette wheel at a casino in Monte Carlo in 1913 has become emblematic of the so-called gambler's fallacy. A roulette wheel has an equal number of red and black spaces, and players can bet on the color on which a ball will land when the wheel is spun. On the night of the incident, the wheel landed on black a surprising 26 times in a row. Bettors lost huge sums of money, based on their mistaken assumption that the wheel was much more likely to break the streak and land on red next. This flawed conception of probability, which fails to consider each independent spin as a discrete event, is the heart of the gambler's fallacy
`,
    questions: 'Which choice best states the main idea of the text?',
    options: [
      'In some situations, the probability of any individual event is not influenced by the probability of the events that preceded it.',
      'A roulette wheel landing on black 26 times is just as likely as it landing on red 26 times, assuming the wheel has an equal number of red and black spaces.',
      'The gambler`s fallacy is difficult to avoid since it is human nature to assume that a random event that has occurred many times is less likely to occur the next time.',
      'An event at a Monte Carlo casino is a well-known example of the mistaken understanding of probability called the gambler`s fallacy.',
    ],
    answer:
      'An event at a Monte Carlo casino is a well-known example of the mistaken understanding of probability called the gambler`s fallacy.',
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `The concept of embodied cognition states that our physical interactions with an object are an essential component of how our brains understand the meaning of the word for that object. For example, our brains do not fully comprehend the meaning of the word "pencil" apart from our familiarity with the physical actions of holding and writing with a pencil.
Thus, a team at Osaka Metropolitan University hypothesized that the brain's processing of the words for physical objects would be impacted if subjects' body movements were limited.
To evaluate this hypothesis, the researchers showed subjects pairs of words on a computer screen. When words for physical objects, such as "cup" and "broom" were displayed, researchers asked the subjects to compare the objects' relative sizes. Some subjects' hands were restrained, while others could move their hands freely.

`,
    questions: `Which finding from the experiment, if true, would most strongly support the research team's hypothesis?`,
    options: [
      `Subjects whose hands were restrained showed low levels of brain activity in brain scans when shown the words "because" and "although."`,
      `Subjects whose hands were restrained showed high levels of brain activity in brain scans when shown the words "because" and "although."`,
      `When shown the words "fork" and "chair," subjects whose hands were restrained showed significantly less brain activity in brain scans than did subjects whose hands were not restrained.`,
      `When shown the words "fork" and "chair" subjects whose hands were restrained showed the same level of brain activity in brain scans as did subjects whose hands were not restrained.`,
    ],
    answer: `When shown the words "fork" and "chair," subjects whose hands were restrained showed significantly less brain activity in brain scans than did subjects whose hands were not restrained.`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `Economic models have been harshly criticized for not accurately predicting major economic crises such as the Great Depression and the 2008 recession. However, these models are only able to incorporate known, historical trends. Both the Great Depression and the 2008 economic recession were triggered by bank failures: sudden, unusual, and traumatic events impossible to predict. Once the failures occurred, and thus became known, they were incorporated into the economic models of the time that then accurately predicted the future direction of the economy. Since the models can be updated, this implies that economic models ……`,
    questions: `Which choice most logically completes the text?`,
    options: [
      `deserve the criticism they have received and should be replaced with a more accurate methodology.`,
      `remain useful but cannot be expected to foresee every potentially disruptive influence on the economy.`,
      `could have been updated more quickly and thus possibly been used to prevent some of the damage of these events.`,
      `have proven their reliability and should be able to predict future crises, since two crisis events are now included.`,
    ],
    answer: `remain useful but cannot be expected to foresee every potentially disruptive influence on the economy.`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `Mary Anning was an English fossil collector in the early 19th century. Despite her many achievements, Anning existed on the outskirts of paleontology. Women were not allowed to join the Geological Society of London. Class politics further stifled Anning, who came from a working-class background. She supported herself by collecting fossils along the shoreline of Lyme Regis, as each winter caused landslides that exposed previously buried fossils. This work was dangerous; _ Anning herself had one near-miss with a landslide that took the life of her dog.`,
    questions: `Which choice completes the text with the most logical transition?`,
    options: [`but,`, `though,`, `on the other hand,`, `indeed,`],
    answer: `indeed,`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `SONAR (Sound Navigation And Ranging) is a system that uses sound waves to measure the depth of water under a boat. SONAR technology was developed during World War 1; ….. in 1490, Leonardo da Vinci experimented with the principle by listening to a tube inserted into water in order to detect marine vessels.`,
    questions: `Which choice completes the text with the most logical transition?`,
    options: [`since`, `despite`, `however`, `for example`],
    answer: `however`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `Damage from tropical storms is more often caused by flood water than by high winds. The storms push a wall of water, called a storm surge, ahead of them that washes over coastal land. Flooding can be _when the storm surge arrives at high tide, when water levels on the coasts are already at their highest for that day.`,
    questions: `Which choice completes the text with the most logical and precise word or phrase?`,
    options: [`aggravated`, `irritated`, `improved`, `assisted`],
    answer: `aggravated`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `Poems written in iambic pentameter consist of lines of 10 syllables, each following a strict unstressed-stressed syllable pattern. Despite the ……. of such a structure, poet Alice
Oswald chose to employ iambic pentameter in her free-flowing lyrical expression "A Short Story of Falling," a poem that explores the process of rain and its impacts on nature.
`,
    questions: `Which choice completes the text with the most logical and precise word or phrase?`,
    options: [`autonomy`, `liberty`, `authority`, `restrictions`],
    answer: `restrictions`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `𝑦 = 3 (𝑥 − 3) + 2𝑥 + 9 𝑦 = 𝑘(𝑥 − 2) − 2𝑥 `,
    questions: `If the system of equations above has no solution, what is the value of 𝑘?`,
    options: [`5`, `6`, `7`, `8`],
    answer: `7`,
  },
  {
    image: 'https://via.placeholder.com/150',
    question: `𝑥^2 + 6𝑥 + 𝑦^2 − 8𝑦 = 24  `,
    questions: `What is the value of the circumference of the circle with the equation above? `,
    options: [`7π`, `14π`, `49π`, `98π`],
    answer: `14π`,
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

const QuizForStudentsBusiness: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>(
    getShuffledQuestions(),
  );

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
            {/* <div className="mb-4">
              <img
                src={shuffledQuestions[currentQuestion].image}
                alt="Question"
                className="mx-auto"
              />
            </div> */}
            <h2 className="text-xl font-bold mb-4">
              {shuffledQuestions[currentQuestion].question}
            </h2>
            <h2 className="text-xl font-bold mb-4">
              {shuffledQuestions[currentQuestion].questions}
            </h2>
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

export default QuizForStudentsBusiness;
