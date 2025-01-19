import React, { useState } from 'react';

const Question = ({ question, onAnswer }) => {
  const [feedback, setFeedback] = useState(null);
  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  const handleAnswer = (answer) => {
    const isCorrect = answer === question.correct_answer;
    setFeedback(isCorrect ? 'happy' : 'sad');
    onAnswer(isCorrect);
  };

  return (
    <div className="question-container">
      <h2 className="question-title">{question.question}</h2>
      <div className="answers-container">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="answer-btn"
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      {feedback && (
        <div className="feedback">
          {feedback === 'happy' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="emoji-icon happy">
              <circle cx="12" cy="12" r="10" fill="#FFD700"/>
              <circle cx="9" cy="10" r="1.5" fill="#fff"/>
              <circle cx="15" cy="10" r="1.5" fill="#fff"/>
              <path d="M8 15c1.5 2 4.5 2 6 0" stroke="#fff" strokeWidth="2" fill="none"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="emoji-icon sad">
              <circle cx="12" cy="12" r="10" fill="#FF5733"/>
              <circle cx="9" cy="10" r="1.5" fill="#fff"/>
              <circle cx="15" cy="10" r="1.5" fill="#fff"/>
              <path d="M8 15c1.5-2 4.5-2 6 0" stroke="#fff" strokeWidth="2" fill="none"/>
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
