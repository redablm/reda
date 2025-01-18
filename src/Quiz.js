import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';

const Quiz = ({ questions, onQuizComplete }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    setTimeRemaining(30);
    setIsTimeUp(false);

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          alert(`Time's up! Your final score is ${score} out of ${questions.length}`);
          onQuizComplete(score); // Call the callback function
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, score]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      alert(`Quiz finished! Your final score is ${finalScore} out of ${questions.length}`);
      onQuizComplete(finalScore); // Pass the final score after the quiz
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  return (
    <div>
      <h2>Time remaining: {timeRemaining}s</h2>
      <h2>Score: {score}</h2>
      {currentQuestionIndex < questions.length ? (
        <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
      ) : (
        <div>Quiz finished! Your final score is {score} out of {questions.length}</div>
      )}
    </div>
  );
};

export default Quiz;
